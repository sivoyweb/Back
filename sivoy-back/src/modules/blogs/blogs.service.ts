import { Injectable } from '@nestjs/common';
import { BlogsRepository } from './blogs.repository';
import { CreateBlogDto } from './blogs.dto';

@Injectable()
export class BlogsService {
    constructor(private readonly blogsRepository: BlogsRepository) {}

    getBlogs() {
        return this.blogsRepository.getBlogs()
    }

    getAllBlogsAdmin() {
        return this.blogsRepository.getAllBlogsAdmin()
    }

    getBlogById(id: string, user) {
        return this.blogsRepository.getBlogById(id, user)
    }

    createBlog(blog: CreateBlogDto) {
        return this.blogsRepository.createBlog(blog)
    }

    updateBlog(id: string, blog: CreateBlogDto) {
        return this.blogsRepository.updateBlog(id, blog)
    }

    deleteBlog(id: string) {
        return this.blogsRepository.deleteBlog(id)
    }

    restoreBlog(id: string) {
        return this.blogsRepository.restoreBlog(id)
    }
}
