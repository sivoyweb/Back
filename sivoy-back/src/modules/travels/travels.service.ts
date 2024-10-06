import { Injectable } from '@nestjs/common';
import { TravelsRepository } from './travels.repository';
import { Review } from 'src/entities/review.entity';
import { Travel } from 'src/entities/travel.entity';
import {
  CreateReviewDto,
  CreateTravelDto,
  UpdateReviewDto,
  UpdateTravelDto,
} from './travels.dto';
import { ApprovalState } from 'src/helpers/ApprovalState.enum';

@Injectable()
export class TravelsService {
  constructor(private readonly travelsRepository: TravelsRepository) {}

  getTravelsAvailable() {
    return this.travelsRepository.getTravelsAvailable();
  }

  getAllTravelsAdmin() {
    return this.travelsRepository.getAllTravelsAdmin();
  }

  getTravelById(id: string, user) {
    return this.travelsRepository.getTravelById(id, user);
  }

  async createTravel(travel: CreateTravelDto) {
    return await this.travelsRepository.createTravel(travel);
  }

  updateTravel(id: string, travel: UpdateTravelDto) {
    return this.travelsRepository.updateTravel(id, travel);
  }

  deleteTravel(id: string) {
    return this.travelsRepository.deleteTravel(id);
  }

  restoreTravel(id: string) {
    return this.travelsRepository.restoreTravel(id);
  }

  getReviewsByTravel(id: string) {
    return this.travelsRepository.getReviewsByTravel(id);
  }

  createReview(Review: CreateReviewDto, userId) {
    return this.travelsRepository.createReview(Review, userId);
  }

  updateReview(id: string, review: UpdateReviewDto, userId: string) {
    return this.travelsRepository.updateReview(id, review, userId);
  }

  deleteReview(id: string, userId: string, userRole: string) {
    return this.travelsRepository.deleteReview(id, userId, userRole);
  }

  updateApprovalState(id: string, ApprovalState: ApprovalState) {
    return this.travelsRepository.updateApprovalState(id, ApprovalState);
  }
}
