import {
  Body,
  Controller,
  Delete,
  Get,
  Optional,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { ReadGuard } from 'src/guards/read.guard';
import { Request } from 'express';
import { CreateBlogDto, UpdateBlogDto } from './blogs.dto';
import { TokenGuard } from 'src/guards/token.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/helpers/roles.enum.';
import { Roles } from 'src/decorators/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Blogs')
@ApiBearerAuth()
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Get()
  getBlogs() {
    return this.blogsService.getBlogs();
  }

  @Get('/all')
  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.Admin)
  getAllBlogsAdmin() {
    return this.blogsService.getAllBlogsAdmin();
  }

  @Get(':id')
  @UseGuards(ReadGuard)
  getBlogById(@Param('id') id: string, @Req() @Optional() req: Request) {
    const user = req.user;
    return this.blogsService.getBlogById(id, user);
  }

  @Post()
  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.Admin)
  createBlog(@Body() blog: CreateBlogDto) {
    return this.blogsService.createBlog(blog);
  }

  @Put(':id')
  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.Admin)
  updateBlog(@Param('id') id: string, @Body() blog: UpdateBlogDto) {
    return this.blogsService.updateBlog(id, blog);
  }

  @Delete(':id')
  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.Admin)
  deleteBlog(id: string) {
    return this.blogsService.deleteBlog(id);
  }

  @Patch(':id')
  @UseGuards(TokenGuard, RolesGuard)
  @Roles(Role.Admin)
  restoreBlog(@Param('id') id: string) {
    return this.blogsService.restoreBlog(id);
  }
}
