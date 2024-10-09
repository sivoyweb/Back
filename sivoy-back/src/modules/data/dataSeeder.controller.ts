import {
  BadRequestException,
  Controller,
  FileTypeValidator,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseGuards,
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
import { CreateProviderDto } from '../providers/providers.dto';
import { ProvidersRepository } from '../providers/providers.repository';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Travel } from 'src/entities/travel.entity';
import { Team } from 'src/entities/team.entity';
import { Promotion } from 'src/entities/promotion.entity';
import { Blog } from 'src/entities/blogs.entity';
import { Disability } from 'src/entities/disabilities.entity';
import { Alliance } from 'src/entities/alliances.entity';
import { Faq } from 'src/entities/faq.entity';
import { Provider } from 'src/entities/provider.entity';
import { DonationsRepository } from '../donations/donations.repository';
import { Donation } from 'src/entities/donation.entity';
import { RolesGuard } from 'src/guards/roles.guard';
import { TokenGuard } from 'src/guards/token.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/helpers/roles.enum.';
import * as path from 'path';
import * as fs from 'fs';
import { Response } from 'express';
import { SuggestionsRepository } from '../suggestions/suggestions.repository';
import { Suggestion } from 'src/entities/suggestion.entity';

@ApiTags('Data')
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
    private readonly providersRepo: ProvidersRepository,
    private readonly donatinoRepo: DonationsRepository,
    private readonly suggestionRepo: SuggestionsRepository,
  ) {}

  @ApiBearerAuth()
  @Post('/import/:entity')
  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.Admin)
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

      if (!jsonData.length) {
        throw new BadRequestException('El archivo no contiene datos válidos.');
      }

      const dataRepo = [];

      if (entity.toLowerCase() === 'user') {
        jsonData.forEach(async (userData: any) => {
          console.log(userData);
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
      } else if (entity.toLowerCase() === 'travel') {
        jsonData.forEach(async (travel: CreateTravelDto) => {
          const newTravel = await this.travelsRepo.createTravel({
            ...travel,
            date: new Date().toISOString(),
          });
          dataRepo.push(newTravel);
        });
      } else if (entity.toLowerCase() === 'team') {
        jsonData.forEach(async (member: CreateTeamDto) => {
          const newTeamMember = await this.teamRepo.addMember(member);
          dataRepo.push(newTeamMember);
        });
      } else if (entity.toLowerCase() === 'promotion') {
        jsonData.forEach(async (promotion: CreatePromotionDto) => {
          const newPromotion =
            await this.promotionsRepo.createPromotion(promotion);
          dataRepo.push(newPromotion);
        });
      } else if (entity.toLowerCase() === 'blog') {
        jsonData.forEach(async (blog: CreateBlogDto) => {
          const newBlog = await this.blogsRepo.createBlog(blog);
          dataRepo.push(newBlog);
        });
      } else if (entity.toLowerCase() === 'disabilities') {
        jsonData.forEach(async (disability: addDisabilityDto) => {
          const newDisability =
            await this.disabilitiesRepo.addDisability(disability);
          dataRepo.push(newDisability);
        });
      } else if (entity.toLowerCase() === 'alliance') {
        jsonData.forEach(async (alliance: CreateAllianceDto) => {
          const newAlliance = await this.alliancesRepo.createAlliance(alliance);
          dataRepo.push(newAlliance);
        });
      } else if (entity.toLowerCase() === 'faq') {
        jsonData.forEach(async (faq: CreateFaqDto) => {
          const newFaq = await this.faqsRepo.createFaq(faq);
          dataRepo.push(newFaq);
        });
      } else if (entity.toLowerCase() === 'provider') {
        jsonData.forEach(async (provider: CreateProviderDto) => {
          const newProvider = await this.providersRepo.createProvider(provider);
          dataRepo.push(newProvider);
        });
      } else {
        return `entity ${entity} was not found to export`;
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

  @ApiBearerAuth()
  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('/export/:entity')
  async exportData(@Param('entity') entity: string) {
    try {
      let data = [];
      let dataFromDb = [];
      if (entity.toLowerCase() === 'user') {
        dataFromDb = await this.userRepo.find({ relations: ['credential'] });
        // Transforma los datos a un formato que pueda usar xlsx
        data = dataFromDb.map((user: User) => ({
          id: user.id,
          name: user.name,
          email: user.credential.email,
          phone: user.phone,
          auth: user.auth,
          role: user.role,
          isRepresentative: user.isRepresentative,
          block: user.block,
          createdAt: user.createdAt,
        }));
      } else if (entity.toLowerCase() === 'travel') {
        dataFromDb = await this.travelsRepo.getAllTravelsAdmin();
        // Transforma los datos a un formato que pueda usar xlsx
        data = dataFromDb.map((travel: Travel) => ({
          id: travel.id,
          accesibilitySeal: travel.accesibilitySeal,
          tula: travel.address,
          available: travel.available,
          city: travel.city,
          country: travel.country,
          averageStars: travel.averageStars,
          date: travel.date,
          name: travel.name,
          description: travel.description,
          email: travel.email,
          openingHours: travel.openingHours,
          serviceType: travel.serviceType,
          website: travel.website,
          phone: travel.phone,
        }));
      } else if (entity.toLowerCase() === 'team') {
        dataFromDb = await this.teamRepo.getTeam();

        data = dataFromDb.map((member: Team | any) => ({
          id: member.id,
          name: member.name,
          linkedin: member.linkedin,
          imagen: {
            url: member.imagenUrl,
            publicId: member.imagenPI,
          },
        }));
      } else if (entity.toLowerCase() === 'promotion') {
        dataFromDb = await this.promotionsRepo.getAllPromotions();

        data = dataFromDb.map((promotion: Promotion) => ({
          id: promotion.id,
          description: promotion.description,
          validFrom: promotion.validFrom,
          validUntil: promotion.validUntil,
          name: promotion.name,
        }));
      } else if (entity.toLowerCase() === 'blog') {
        dataFromDb = await this.blogsRepo.getAllBlogsAdmin();

        data = dataFromDb.map((blog: Blog) => ({
          id: blog.id,
          title: blog.title,
          content: blog.content,
          date: blog.date,
        }));
      } else if (entity.toLowerCase() === 'disabilities') {
        dataFromDb = await this.disabilitiesRepo.getDisabilities();

        data = dataFromDb.map((disability: Disability) => ({
          id: disability.id,
          name: disability.name,
        }));
      } else if (entity.toLowerCase() === 'alliance') {
        dataFromDb = await this.alliancesRepo.getAllAlliances();

        data = dataFromDb.map((alliance: Alliance) => ({
          id: alliance.id,
          name: alliance.name,
        }));
      } else if (entity.toLowerCase() === 'faq') {
        dataFromDb = await this.faqsRepo.getFaqs();

        data = dataFromDb.map((faq: Faq) => ({
          id: faq.id,
          question: faq.question,
          answer: faq.answer,
        }));
      } else if (entity.toLowerCase() === 'provider') {
        dataFromDb = await this.providersRepo.getAllProviders();

        data = dataFromDb.map((provider: Provider) => ({
          id: provider.id,
          name: provider.name,
          description: provider.description,
        }));
      } else if (entity.toLowerCase() === 'donation') {
        dataFromDb = await this.donatinoRepo.getAllDonations();

        data = dataFromDb.map((donation: Donation) => ({
          id: donation.id,
          amount: donation.amount,
          date: donation.date,
          description: donation.description,
          payer: donation.payer,
          status: donation.status,
        }));
      } else if (entity.toLowerCase() === 'suggestion') {
        dataFromDb = await this.suggestionRepo.getPendingSuggestions();

        data = dataFromDb.map((suggestion: Suggestion) => ({
          id: suggestion.id,
          address: suggestion.address,
          city: suggestion.city,
          country: suggestion.country,
          date: suggestion.date,
          description: suggestion.description,
          email: suggestion.email,
          name: suggestion.name,
          openingHours: suggestion.openingHours,
          phone: suggestion.phone,
          state: suggestion.state,
          typeService: suggestion.typeService,
          website: suggestion.website,
        }));
      } else {
        throw new HttpException(
          { status: 404, error: `entity ${entity} was not found to export` },
          404,
        );
      }

      // Crea una hoja de trabajo de Excel a partir de los datos
      const worksheet = XLSX.utils.json_to_sheet(data);

      // Crea un libro de trabajo
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, `${entity} Data`);

      // Crea el directorio si no existe
      const exportDir = path.join(__dirname, '..', 'exports');

      if (!fs.existsSync(exportDir)) {
        fs.mkdirSync(exportDir);
      }

      // Genera el archivo Excel en la ruta específica
      const filePath = path.join(exportDir, `${entity}_data.xlsx`);
      XLSX.writeFile(workbook, filePath);

      // Retorna la URL del archivo para descargar desde el frontend
      return {
        message: 'Archivo exportado exitosamente',
        fileName: `${entity}_data.xlsx`,
      };
    } catch (error) {
      return error;
    }
  }

  @ApiBearerAuth()
  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('download/:fileName')
  async downloadFile(
    @Param('fileName') fileName: string,
    @Res() res: Response,
  ) {
    const exportFolderPath = path.join(__dirname, '..', 'exports');

    // Construir la ruta completa del archivo
    const filePath = path.join(exportFolderPath, fileName);

    // Verificar si el archivo existe
    if (!fs.existsSync(filePath)) {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }

    // Enviar el archivo como una descarga
    res.download(filePath, fileName, (err) => {
      if (err) {
        throw new HttpException(
          'Error downloading file',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    });
  }
}