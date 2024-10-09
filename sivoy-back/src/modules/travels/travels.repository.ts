import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/entities/review.entity';
import { Travel } from 'src/entities/travel.entity';
import { Repository } from 'typeorm';
import {
  CreateReviewDto,
  CreateTravelDto,
  UpdateReviewDto,
  UpdateTravelDto,
} from './travels.dto';
import { User } from 'src/entities/user.entity';
import { Role } from 'src/helpers/roles.enum.';
import { ApprovalState } from 'src/helpers/ApprovalState.enum';

@Injectable()
export class TravelsRepository {
  constructor(
    @InjectRepository(Travel)
    private readonly travelsRepository: Repository<Travel>,
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getTravelsAvailable(): Promise<Travel[]> {
    let travels = await this.travelsRepository
      .createQueryBuilder('travel')
      .leftJoinAndSelect('travel.reviews', 'review')
      .leftJoinAndSelect('review.user', 'user')
      .leftJoinAndSelect('travel.images', 'image')
      .leftJoinAndSelect('travel.provider', 'provider')
      .where('travel.available = :available', { available: true })
      .getMany();

    travels.forEach((travel) => {
      travel.reviews = travel.reviews.filter(
        (review) => review.state === ApprovalState.APPROVED,
      );
    });

    return travels;
  }

  async getAllTravelsAdmin(): Promise<Travel[]> {
    let travels = await this.travelsRepository
      .createQueryBuilder('travel')
      .leftJoinAndSelect('travel.reviews', 'review')
      .leftJoinAndSelect('review.user', 'user')
      .leftJoinAndSelect('travel.images', 'image')
      .leftJoinAndSelect('travel.provider', 'provider')
      .getMany();
    travels.forEach((travel) => {
      travel.reviews = travel.reviews.filter(
        (review) => review.state === ApprovalState.APPROVED,
      );
    });

    return travels;
  }

  async getTravelById(id: string, user) {
    const travel = await this.travelsRepository
      .createQueryBuilder('travel')
      .leftJoinAndSelect('travel.reviews', 'review')
      .leftJoinAndSelect('review.user', 'user')
      .leftJoinAndSelect('travel.images', 'image')
      .leftJoinAndSelect('travel.provider', 'provider')
      .where('travel.id = :id', { id })
      .getOne();

    if (!travel) {
      throw new NotFoundException(`Travel with ID ${id} not found`);
    }
    if (!travel.available) {
      if (user && user.role === Role.Admin) {
        return travel;
      }
      throw new BadRequestException('This travel is no longer available');
    }
    travel.reviews = travel.reviews.filter(
      (review) => review.state === ApprovalState.APPROVED,
    );
    return travel;
  }

  async createTravel(travel: CreateTravelDto): Promise<Travel> {
    const existingTravel = await this.travelsRepository.findOne({
      where: { name: travel.name },
    });

    if (existingTravel) {
      throw new BadRequestException(
        `A travel with the name '${travel.name}' already exists.`,
      );
    }

    const newTravel = this.travelsRepository.create(travel);

    try {
      return await this.travelsRepository.save(newTravel);
    } catch (error) {
      throw new BadRequestException(`Error creating travel: ${error.message}`);
    }
  }

  async updateTravel(id: string, travel: UpdateTravelDto) {
    const updateTravel = await this.travelsRepository.findOne({
      where: { id },
      relations: ['images']
    });
    if (!updateTravel)
      throw new NotFoundException(`travel whit ${id} not found`);
    Object.assign(updateTravel, travel);
    if (!travel.images) {
      travel.images = [];
    }
  
    // Agregamos las imágenes existentes
    travel.images.push(...updateTravel.images);
    await this.travelsRepository.save(updateTravel);
    return updateTravel;
  }

  async deleteTravel(id: string) {
    const travel = await this.travelsRepository.findOneBy({ id });
    if (!travel) throw new NotFoundException(`travel whit ${id} not found`);
    if (travel.available === false)
      throw new BadRequestException('This travel was no longer available');
    travel.available = false;
    await this.travelsRepository.save(travel);
    return travel;
  }

  async restoreTravel(id: string) {
    const travel = await this.travelsRepository.findOneBy({ id });
    if (!travel) throw new NotFoundException(`travel whit ${id} not found`);
    if (travel.available === true)
      throw new BadRequestException('This travel is already available');
    travel.available = true;
    await this.travelsRepository.save(travel);
    return travel;
  }

  async createReview(Review: CreateReviewDto, userId) {
    const existingReviews = await this.reviewsRepository.find({
      where: {
        travel: { id: Review.travelId },
        user: { id: userId },
      },
    });
    const approvedReview = existingReviews.find(
      (review) => review.state === ApprovalState.APPROVED,
    );
    const pendingReview = existingReviews.find(
      (review) => review.state === ApprovalState.PENDING,
    );

    if (approvedReview) {
      throw new BadRequestException(
        'You have already created an approved review for this travel.',
      );
    }

    if (pendingReview) {
      throw new BadRequestException(
        'You already have a pending review for this travel.',
      );
    }
    const review = this.reviewsRepository.create(Review);
    const travel = await this.travelsRepository.findOne({
      where: { id: Review.travelId },
    });
    if (!travel) {
      throw new NotFoundException(`travel whit ${travel.id} not found`);
    }

    review.user = userId;
    review.travel = travel;

    await this.reviewsRepository.save(review);

    return review;
  }

  async updateTravelAverageStars(travelId: string): Promise<void> {
    const travel = await this.travelsRepository.findOne({
      where: { id: travelId },
      relations: { reviews: true },
    });

    if (travel) {
      const approvedReviews = travel.reviews.filter(
        (review) => review.state === ApprovalState.APPROVED,
      );

      if (approvedReviews.length > 0) {
        const totalStars = approvedReviews.reduce(
          (sum, review) => sum + review.stars,
          0,
        );
        travel.averageStars = parseFloat(
          (totalStars / approvedReviews.length).toFixed(2),
        );
      } else {
        travel.averageStars = 0;
      }
      await this.travelsRepository.save(travel);
    }
  }

  async updateReview(id: string, review: UpdateReviewDto, userId: string) {
    const updateReview = await this.reviewsRepository.findOne({
      where: { id },
      relations: { user: true, travel: true },
    });
    if (!updateReview)
      throw new NotFoundException(`Review whit ${id} not found`);
    if (updateReview.user.id !== userId) {
      throw new ForbiddenException(
        'You do not have permission to update this review',
      );
    }
    updateReview.state = ApprovalState.PENDING;
    Object.assign(updateReview, review);
    await this.reviewsRepository.save(updateReview);
    await this.updateTravelAverageStars(updateReview.travel.id);

    return updateReview;
  }

  async deleteReview(id: string, userId: string, userRole: string) {
    const review = await this.reviewsRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }
    if (review.user.id !== userId && userRole !== Role.Admin) {
      throw new ForbiddenException(
        'You do not have permission to delete this review',
      );
    }
    if (review.state === ApprovalState.REJECTED) {
      throw new BadRequestException(
        'This review is already no longer available',
      );
    }
    review.state = ApprovalState.REJECTED;
    await this.reviewsRepository.save(review);
    await this.updateTravelAverageStars(review.travel.id);
    return review;
  }

  async updateApprovalState(id: string, newState: ApprovalState) {
    const review = await this.reviewsRepository.findOne({
      where: { id },
      relations: { travel: true },
    });

    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }

    review.state = newState;
    await this.reviewsRepository.save(review);

    if (newState === ApprovalState.APPROVED) {
      await this.updateTravelAverageStars(review.travel.id);
    }

    return review;
  }

  async getPendingReviews() {
    const reviews = await this.reviewsRepository.find({
      where: { state: ApprovalState.PENDING },
      relations: {
        user: true,    
        travel: true,  
      },
    });
    return reviews;
  }
  
  async getAllReviews() {
    const reviews = await this.reviewsRepository.find({
      relations: {
        user: true,    
        travel: true,  
      },
    })
    return reviews
  }

  async getReviewById(id: string) {
    const review = await this.reviewsRepository.findOne({
      where: { id },
      relations: {
        user: true,    
        travel: true,  
      },
    })
    return review
  }
}
