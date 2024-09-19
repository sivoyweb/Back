import { Injectable } from '@nestjs/common';
import { TravelsRepository } from './travels.repository';
import { Review } from 'src/entities/review.entity';
import { Travel } from 'src/entities/travel.entity';

@Injectable()
export class TravelsService {
    constructor(private readonly travelsRepository: TravelsRepository) {}
    
    getAllTravels(page: number, limit: number) {
        return this.travelsRepository.getAllTravels(page, limit)
    }

    getTravelByName(name: string) {
        return this.travelsRepository.getTravelByName(name)
    }

    createTravel(Travel: Travel) {
        return this.travelsRepository.createTravel(Travel)
    }

    updateTravel(id: string, Review: Review) {
        return this.travelsRepository.updateTravel(id, Review)
    }

    deleteTravel(id: string) {
        return this.travelsRepository.deleteTravel(id)
    }

    getReviews() {
        return this.travelsRepository.getReviews()
    }

    createReview(id: string, Review: Review) {
        return this.travelsRepository.createReview(id, Review)
    }
    
    updateReview(id: string, Review: Review) {
        return this.travelsRepository.updateReview(id, Review)
    }

    deleteReview(id: string) {
        return this.travelsRepository.deleteReview(id)
    }

}
