import { Injectable } from '@nestjs/common';
import { BlogsRepository } from './blogs.repository';

@Injectable()
export class BlogsService {
    constructor(private readonly blogsRepository: BlogsRepository) {}
}
