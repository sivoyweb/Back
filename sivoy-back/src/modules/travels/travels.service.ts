import { Injectable } from '@nestjs/common';
import { TravelsRepository } from './travels.repository';
import { Review } from 'src/entities/review.entity';
import { Travel } from 'src/entities/travel.entity';
import { CreateReviewDto, CreateTravelDto, UpdateTravelDto } from './travels.dto';

@Injectable()
export class TravelsService {
    constructor(private readonly travelsRepository: TravelsRepository) {}
    
    getTravelsAvailable(page: number, limit: number) {
        return this.travelsRepository.getTravelsAvailable(page, limit)
    }

    getAllTravels(page: number, limit: number) {
        return this.travelsRepository.getAllTravels(page, limit)
    }

    getTravelById(id: string) {
        return this.travelsRepository.getTravelById(id)
    }

    async createTravel(travel: CreateTravelDto) {
        try {
            return await this.travelsRepository.createTravel(travel);
        } catch (error) {
            throw new Error(`Error creating travel: ${error.message}`);
        }
    }

    updateTravel(id: string, travel: UpdateTravelDto) {
        return this.travelsRepository.updateTravel(id, travel)
    }

    deleteTravel(id: string) {
        return this.travelsRepository.deleteTravel(id)
    }

    getReviewsByTravel(id: string) {
        return this.travelsRepository.getReviewsByTravel(id)
    }

    createReview( Review: CreateReviewDto) {
        return this.travelsRepository.createReview( Review)
    }
    
    updateReview(id: string, Review: Review) {
        return this.travelsRepository.updateReview(id, Review)
    }

    deleteReview(id: string) {
        return this.travelsRepository.deleteReview(id)
    }

}
