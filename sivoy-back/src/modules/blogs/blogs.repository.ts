import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from 'src/entities/blogs.entity';
import { Role } from 'src/helpers/roles.enum.';

import { Repository } from 'typeorm';
import { CreateBlogDto, UpdateBlogDto } from './blogs.dto';

@Injectable()
export class BlogsRepository {
  constructor(
    @InjectRepository(Blog) private readonly blogsRepository: Repository<Blog>,
  ) {}

  async getBlogs() {
    let blogs = await this.blogsRepository.find({
      relations: {
        images: true,
      },
    });
    blogs = blogs.filter((blogs) => blogs.visible);
    return blogs;
  }

  async getAllBlogsAdmin() {
    let blogs = await this.blogsRepository.find({
      relations: {
        images: true,
      },
    });
    return blogs;
  }

  async getBlogById(id: string, user) {
    const blog = await this.blogsRepository.findOne({
      where: { id },
      relations: {
        images: true,
      },
    });
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    if (blog.visible === false) {
      if (user && user.role === Role.Admin) {
        return blog;
      }
      throw new BadRequestException('This blog is no longer available');
    }
    return blog;
  }

  async createBlog(blog: CreateBlogDto) {
    const existingBlog = await this.blogsRepository.findOne({
      where: { title: blog.title },
    });
    if (existingBlog) {
      throw new BadRequestException(
        `A blog with the name '${blog.title}' already exists.`,
      );
    }
    const newBlog = this.blogsRepository.create(blog);
    try {
      return await this.blogsRepository.save(newBlog);
    } catch (error) {
      throw new BadRequestException(`Error creating blog: ${error.message}`);
    }
  }

  async updateBlog(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    const blog = await this.blogsRepository.findOne({
      where: { id },
      relations: ['images'],
    });

    if (!blog) {
      throw new HttpException(
        { status: 404, error: `Blog with ID ${id} not found` },
        404,
      );
    }
    Object.assign(blog, updateBlogDto);
    if (updateBlogDto.images) {
      blog.images.push(...updateBlogDto.images);
    }
    return await this.blogsRepository.save(blog);
  }

  async deleteBlog(id: string) {
    const blog = await this.blogsRepository.findOneBy({ id });
    if (!blog) throw new NotFoundException(`blog whit ${id} not found`);
    if (blog.visible === false)
      throw new BadRequestException('This blog was no longer available');
    blog.visible = false;
    await this.blogsRepository.save(blog);
    return blog;
  }

  async restoreBlog(id: string) {
    const blog = await this.blogsRepository.findOneBy({ id });
    if (!blog) throw new NotFoundException(`Blog with ${id} not found`);
    if (blog.visible === true)
      throw new BadRequestException('This blog is already visible');
    blog.visible = true;
    await this.blogsRepository.save(blog);
    return blog;
  }
}
