import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { AddImageDto, UpdateImageDto } from './image.dto';
import { TokenGuard } from 'src/guards/token.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/helpers/roles.enum.';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('/images')
export class ImagesController {
  constructor(private readonly imageService: ImagesService) {}

  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('/')
  async getAll() {
    return await this.imageService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    return await this.imageService.getImageById(id as string);
  }

  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post('/')
  async addImage(@Body() imageData: AddImageDto) {
    return await this.imageService.addImage(imageData);
  }

  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put('/:id')
  async updateImage(
    @Body() ImageData: UpdateImageDto,
    @Param('id') id: string,
  ) {
    return await this.imageService.updateImage(id as string, ImageData);
  }

  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete('/:id')
  async removeImage(@Param('id') id: string) {
    return await this.imageService.removeImage(id);
  }

  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put('/:id')
  async activeImage(@Param('id') id: string) {
    return await this.imageService.activeImage(id as string);
  }
}
