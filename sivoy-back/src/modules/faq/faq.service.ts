import { Injectable } from '@nestjs/common';
import { FaqRepository } from './faq.repository';
import { CreateFaqDto, UpdateFaqDto } from './faq.dto';

@Injectable()
export class FaqService {
  constructor(private readonly faqRepository: FaqRepository) {}

  getFaqs() {
    return this.faqRepository.getFaqs();
  }

  getFaqById(id: string, user) {
    return this.faqRepository.getFaqById(id, user);
  }

  createFaq(faq: CreateFaqDto) {
    return this.faqRepository.createFaq(faq);
  }

  updateFaq(id: string, faq: UpdateFaqDto) {
    return this.faqRepository.updateFaq(id, faq);
  }

  deleteFaq(id: string) {
    return this.faqRepository.deleteFaq(id);
  }
}
