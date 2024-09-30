import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Review } from "src/entities/review.entity";
import { Travel } from "src/entities/travel.entity";
import { Repository } from "typeorm";
import { CreateReviewDto, CreateTravelDto, UpdateTravelDto } from "./travels.dto";
import { User } from "src/entities/user.entity";
import { Role } from "src/helpers/roles.enum.";

@Injectable()
    export class TravelsRepository {
        constructor( 
            @InjectRepository(Travel) private readonly travelsRepository: Repository<Travel>,
            @InjectRepository(Review) private readonly reviewsRepository: Repository<Review>,
            @InjectRepository (User) private readonly userRepository: Repository<User> ) {}
        
        async getTravelsAvailable(): Promise<Travel[]> {
            let travels = await this.travelsRepository.find({
                relations: {
                    reviews: {
                        user: true,
                      },
                    images: true,
                    provider: true
                }
            });
            travels = travels.filter(travel => travel.available);
            return travels;
        }

        async getAllTravelsAdmin(): Promise<Travel[]> {
            let travels = await this.travelsRepository.find({
                relations: {
                    reviews: {
                        user: true,
                      },
                    images: true,
                    provider: true
                }
            });
            return travels;
        }

        async getTravelById(id: string, user) {
            const travel = await this.travelsRepository.findOne({
                where: { id },
                relations: {
                  reviews: {
                    user: true,
                  },
                  images: true,
                  provider: true,
                },
            });
            if (!travel) {
                throw new NotFoundException(`Travel with ID ${id} not found`);
              }
              if (travel.available === false) {

                if (user && user.role === Role.Admin) {
                  return travel;
                }
                throw new BadRequestException('This travel is no longer available');
              }
              return travel;
            }
 
        async createTravel(travel: CreateTravelDto): Promise<Travel> {
            const existingTravel = await this.travelsRepository.findOne({ where: { name: travel.name } });
        
            if (existingTravel) {
                throw new BadRequestException(`A travel with the name '${travel.name}' already exists.`);
            }
        
            const newTravel = this.travelsRepository.create(travel);
        
            try {
                return await this.travelsRepository.save(newTravel);
            } catch (error) {
                throw new BadRequestException(`Error creating travel: ${error.message}`);
            }
        }

        async updateTravel(id: string, travel: UpdateTravelDto) {
            const updateTravel = await this.travelsRepository.findOneBy({id});
            if (!updateTravel) throw new NotFoundException (`travel whit ${id} not found`)
            await this.travelsRepository.update(id, travel);    
            return updateTravel;
        }

        async deleteTravel(id: string) {
            const travel = await this.travelsRepository.findOneBy({id})
            if (!travel) throw new NotFoundException (`travel whit ${id} not found`)
            if (travel.available === false) throw new BadRequestException ('This travel was no longer available')
            travel.available = false;
            await this.travelsRepository.save(travel)
            return travel
        }

        async getReviewsByTravel(id: string) {
            const travel = await this.travelsRepository.findOne({
                where: { id },
                select: ['id', 'name'],
                relations: {
                    reviews: {
                        user: true,
                      },
                }
            })
            if (!travel) throw new NotFoundException (`travel whit ${id} not found`)
            if (travel.available === false) throw new BadRequestException ('This travel was no longer available')
            return travel
        }

        async createReview(Review: CreateReviewDto, userId) {
            const review = this.reviewsRepository.create(Review);
        
            const travel = await this.travelsRepository.findOne({ where: { id: Review.travelId } });

            if (!travel) {
                throw new NotFoundException(`travel whit ${travel.id} not found`);
            }

            review.user = userId;
            review.travel = travel;

            await this.reviewsRepository.save(review);
            await this.updateTravelAverageStars(review.travel.id);
    
            return review;
            }

        async updateTravelAverageStars(travelId: string): Promise<void> {
            const travel = await this.travelsRepository.findOne({
                where: { id: travelId },
                relations: { reviews: true },
            });
            
            if (travel) {
                if (travel.reviews.length > 0) {
                    const totalStars = travel.reviews.reduce((sum, review) => sum + review.stars, 0);
                    travel.averageStars = parseFloat((totalStars / travel.reviews.length).toFixed(2));
                } else {
                    travel.averageStars = 0;
                }
                await this.travelsRepository.save(travel);
            }
        }

        async updateReview(id: string, review: UpdateTravelDto, userId: string) {
            const updateReview = await this.reviewsRepository.findOne({
                where: { id },
                relations: { user: true },
            });
            if (!updateReview) throw new NotFoundException (`Review whit ${id} not found`)
            if (updateReview.user.id !== userId) {
                throw new ForbiddenException('You do not have permission to update this review');
            }
            Object.assign(updateReview, review);
            await this.reviewsRepository.save(updateReview);
            await this.updateTravelAverageStars(updateReview.travel.id);
            return updateReview;
        }

        async deleteReview(id: string, userId: string, userRole: string) {
            const review = await this.reviewsRepository.findOne({
                where: { id },
                relations: { user: true }
            });
            if (!review) throw new NotFoundException (`review whit ${id} not found`)
            if (review.user.id !== userId && userRole !== Role.Admin) {
            throw new ForbiddenException('You do not have permission to delete this review');
            }
            if (review.visible === false) throw new BadRequestException ('This review was no longer available')
                review.visible = false;
            await this.reviewsRepository.save(review)
            return review
        }
    }

