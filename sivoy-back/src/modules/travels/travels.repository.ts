import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Review } from "src/entities/review.entity";
import { Travel } from "src/entities/travel.entity";
import { Repository } from "typeorm";
import { CreateTravelDto } from "./travels.dto";

@Injectable()
    export class TravelsRepository {
        constructor(@InjectRepository(Travel) private readonly travelsRepository: Repository<Travel>) {}
        
        getAllTravels(page: number, limit: number): Promise<Travel[]> {
            return this.travelsRepository.find({ skip: (page - 1) * limit, take: limit })
        }

        getTravelByName(name: string) {
            return "Travel by Name"
        }
 
        async createTravel(travel: CreateTravelDto){
            try {
                return await this.travelsRepository.save(travel);
            } catch (error) {
                throw new Error(`Database error: ${error.message}`);
            }
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