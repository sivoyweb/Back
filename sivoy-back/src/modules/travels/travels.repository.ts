import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Review } from "src/entities/review.entity";
import { Travel } from "src/entities/travel.entity";
import { Repository } from "typeorm";

@Injectable()
    export class TravelsRepository {
        constructor(@InjectRepository(Travel) private readonly travelsRepository: Repository<Travel>) {}
        
        getAllTravels(page: number, limit: number) {
            return "Travels List"
        }

        getTravelByName(name: string) {
            return "Travel by Name"
        }
 
        createTravel(Travel: Travel) {
            return "Travel Created"
        }

        updateTravel(id: string, Review: Review) {
            return "Travel Updated"
        }

        deleteTravel(id: string) {
            return "Travel Deleted"
        }

        getReviews() {
            throw new Error('Method not implemented.');
        }

        createReview(id: string, Review: Review) {
            throw new Error('Method not implemented.');
        }

        updateReview(id: string, Review: Review) {
            throw new Error('Method not implemented.');
        }

        deleteReview(id: string) {
            throw new Error('Method not implemented.');
        }
    }