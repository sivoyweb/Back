import {
  BadRequestException,
  Controller,
  FileTypeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { DataSeederService } from './dataSeeder.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as XLSX from 'xlsx';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Credential } from 'src/entities/credential.entity';
import { TravelsRepository } from '../travels/travels.repository';
import { TeamRepository } from '../team/team.repository';
import { PromotionsRepository } from '../promotions/promotions.repository';
import { BlogsRepository } from '../blogs/blogs.repository';
import { DisabilitiesRepository } from '../disabilities/disabilities.repository';
import { AlliancesRepository } from '../alliances/alliances.repository';
import { FaqRepository } from '../faq/faq.repository';

import { CreateTravelDto } from '../travels/travels.dto';
import { CreateTeamDto } from '../team/team.dto';
import { CreatePromotionDto } from '../promotions/promotion.dto';
import { CreateBlogDto } from '../blogs/blogs.dto';
import { addDisabilityDto } from '../disabilities/disabilities.dto';
import { CreateAllianceDto } from '../alliances/alliances.dto';
import { CreateFaqDto } from '../faq/faq.dto';

@Controller('/data')
export class DataController {
  constructor(
    private readonly dataService: DataSeederService,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Credential)
    private readonly credentialRepo: Repository<Credential>,
    private readonly travelsRepo: TravelsRepository,
    private readonly teamRepo: TeamRepository,
    private readonly promotionsRepo: PromotionsRepository,
    private readonly blogsRepo: BlogsRepository,
    private readonly disabilitiesRepo: DisabilitiesRepository,
    private readonly alliancesRepo: AlliancesRepository,
    private readonly faqsRepo: FaqRepository,
  ) {}

  @Post('/import/:entity')
  @UseInterceptors(FileInterceptor('file'))
  async importData(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType:
              /(application\/vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet|application\/vnd\.ms-excel)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param('entity') entity: string,
  ) {
    try {
      const workbook = XLSX.read(file.buffer, { type: 'buffer' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      console.log(workbook);
      console.log(worksheet);
      console.log(jsonData);

      if (!jsonData.length) {
        throw new BadRequestException('El archivo no contiene datos válidos.');
      }

      const dataRepo = [];

      if (entity.toLowerCase() === 'user') {
        jsonData.forEach(async (userData: any) => {
          const password = await bcrypt.hash(userData?.password, 11);
          const newCredential: Partial<Credential> = {
            email: userData?.email,
            password,
          };

          const credential = await this.credentialRepo.save(newCredential);

          const newUser: Partial<User> = {
            name: userData?.name,
            phone: userData?.phone,
            role: userData?.role,
            credential,
          };

          const user = await this.userRepo.save(newUser);

          dataRepo.push(user);
        });
      }
      if (entity.toLowerCase() === 'travel') {
        jsonData.forEach(async (travel: CreateTravelDto) => {
          const newTravel = await this.travelsRepo.createTravel(travel);
          dataRepo.push(newTravel);
        });
      }
      if (entity.toLowerCase() === 'team') {
        jsonData.forEach(async (member: CreateTeamDto) => {
          const newTeamMember = await this.teamRepo.addMember(member);
          dataRepo.push(newTeamMember);
        });
      }
      if (entity.toLowerCase() === 'promotion') {
        jsonData.forEach(async (promotion: CreatePromotionDto) => {
          const newPromotion =
            await this.promotionsRepo.createPromotion(promotion);
          dataRepo.push(newPromotion);
        });
      }
      if (entity.toLowerCase() === 'blog') {
        jsonData.forEach(async (blog: CreateBlogDto) => {
          const newBlog = await this.blogsRepo.createBlog(blog);
          dataRepo.push(newBlog);
        });
      }
      if (entity.toLowerCase() === 'disabilities') {
        jsonData.forEach(async (disability: addDisabilityDto) => {
          const newDisability =
            await this.disabilitiesRepo.addDisability(disability);
          dataRepo.push(newDisability);
        });
      }
      if (entity.toLowerCase() === 'alliance') {
        jsonData.forEach(async (alliance: CreateAllianceDto) => {
          const newAlliance = await this.alliancesRepo.createAlliance(alliance);
          dataRepo.push(newAlliance);
        });
      }
      if (entity.toLowerCase() === 'faq') {
        jsonData.forEach(async (faq: CreateFaqDto) => {
          const newFaq = await this.faqsRepo.createFaq(faq);
          dataRepo.push(newFaq);
        });
      }

      return {
        message: 'Importación exitosa',
        dataRepo,
      };
    } catch (error) {
      throw new BadRequestException(
        'Error al procesar el archivo: ' + error.message,
      );
    }
  }
}
