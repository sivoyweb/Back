import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Faq } from 'src/entities/faq.entity';
import { Repository } from 'typeorm';
import { CreateFaqDto, UpdateFaqDto } from './faq.dto';
import { Role } from 'src/helpers/roles.enum.';

@Injectable()
export class FaqRepository {
  constructor(
    @InjectRepository(Faq) private readonly faqRepository: Repository<Faq>,
  ) {}

  async getFaqs() {
    let Faqs = await this.faqRepository.find();
    Faqs = Faqs.filter((Faqs) => Faqs.visible);
    return Faqs;
  }

  async getFaqById(id: string, user) {
    const faq = await this.faqRepository.findOne({
      where: { id },
    });
    if (!faq) {
      throw new NotFoundException(`question with ID ${id} not found`);
    }
    if (faq.visible === false) {
      if (user && user.role === Role.Admin) {
        return faq;
      }
      throw new BadRequestException('This question is no longer available');
    }
    return faq;
  }

  async createFaq(faq: CreateFaqDto) {
    const newQuestion = this.faqRepository.create(faq);
    try {
      return await this.faqRepository.save(newQuestion);
    } catch (error) {
      throw new BadRequestException(
        `Error creating question: ${error.message}`,
      );
    }
  }

  async updateFaq(id: string, faq: UpdateFaqDto) {
    const updateQuestion = await this.faqRepository.findOneBy({ id });
    if (!updateQuestion)
      throw new NotFoundException(`Question whit ${id} not found`);
    await this.faqRepository.update(id, faq);
    return updateQuestion;
  }

  async deleteFaq(id: string) {
    const faq = await this.faqRepository.findOneBy({ id });
    if (!faq) throw new NotFoundException(`question whit ${id} not found`);
    if (faq.visible === false)
      throw new BadRequestException('This question was no longer available');
    faq.visible = false;
    await this.faqRepository.save(faq);
    return faq;
  }
}
