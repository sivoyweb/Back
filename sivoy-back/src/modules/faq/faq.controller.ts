import {
  Body,
  Controller,
  Delete,
  Get,
  Optional,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FaqService } from './faq.service';
import { CreateFaqDto, UpdateFaqDto } from './faq.dto';
import { Request } from 'express';
import { ReadGuard } from 'src/guards/read.guard';
import { ApiTags } from '@nestjs/swagger';
import { TokenGuard } from 'src/guards/token.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/helpers/roles.enum.';

@ApiTags('Faq')
@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Get()
  getFaqs() {
    return this.faqService.getFaqs();
  }

  @Get(':id')
  @UseGuards(ReadGuard)
  getFaqById(@Param('id') id: string, @Req() @Optional() req: Request) {
    const user = req.user;
    return this.faqService.getFaqById(id, user);
  }

  @Post()
  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.Admin)
  createFaq(@Body() faq: CreateFaqDto) {
    return this.faqService.createFaq(faq);
  }

  @Put(':id')
  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.Admin)
  updateFaq(@Param('id') id: string, @Body() faq: UpdateFaqDto) {
    return this.faqService.updateFaq(id, faq);
  }

  @Delete(':id')
  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.Admin)
  deleteFaq(@Param('id') id: string) {
    return this.faqService.deleteFaq(id);
  }
}
