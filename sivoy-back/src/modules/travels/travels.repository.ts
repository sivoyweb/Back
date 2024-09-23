import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Review } from "src/entities/review.entity";
import { Travel } from "src/entities/travel.entity";
import { Repository } from "typeorm";
import { CreateReviewDto, CreateTravelDto, UpdateTravelDto } from "./travels.dto";
import { User } from "src/entities/user.entity";

@Injectable()
    export class TravelsRepository {
        constructor( 
            @InjectRepository(Travel) private readonly travelsRepository: Repository<Travel>,
            @InjectRepository(Review) private readonly reviewsRepository: Repository<Review>,
            @InjectRepository (User) private readonly userRepository: Repository<User> ) {}
        
        async getTravelsAvailable(): Promise<Travel[]> {
            let travels = await this.travelsRepository.find({
                relations: {
                    reviews: true,
                    images: true,
                    promotions: true,
                    provider: true
                }
            });
            travels = travels.filter(travel => travel.available);
            return travels;
        }

        async getAllTravels(): Promise<Travel[]> {
            let travels = await this.travelsRepository.find({
                relations: {
                    reviews: true,
                    images: true,
                    promotions: true,
                    provider: true
                }
            });
            return travels;
        }

        async getTravelById(id: string) {
            const travel = await this.travelsRepository.findOne({
                where: { id },
                relations: {
                    reviews: true,
                    images: true,
                    promotions: true,
                    provider: true
                }
            })
            if (!travel) throw new NotFoundException (`travel whit ${id} not found`)
            if (travel.available === false) throw new BadRequestException ('This travel was no longer available')
            return travel
        }
 
        async createTravel(travel: CreateTravelDto){
            try {
                return await this.travelsRepository.save(travel);
            } catch (error) {
                throw new Error(`Database error: ${error.message}`);
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
                    reviews: true,
                }
            })
            if (!travel) throw new NotFoundException (`travel whit ${id} not found`)
            if (travel.available === false) throw new BadRequestException ('This travel was no longer available')
            return travel
        }

        async createReview(Review: CreateReviewDto) {
            const review = this.reviewsRepository.create(Review);
        
        const user = await this.userRepository.findOne({ where: { id: Review.userId } });
        const travel = await this.travelsRepository.findOne({ where: { id: Review.travelId } });

        if (!user) {
            throw new NotFoundException(`user whit ${user.id} not found`);
        }

        if (!travel) {
            throw new NotFoundException(`travel whit ${travel.id} not found`);
        }

        review.user = user;
        review.travel = travel;

        return this.reviewsRepository.save(review);
        }

        

        updateReview(id: string, Review: Review) {
            throw new Error('Method not implemented.');
        }

        deleteReview(id: string) {
            throw new Error('Method not implemented.');
        }
    }

