import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Param,
  NotFoundException,
  Post,
  Body,
  Put,
  Query,
  Delete,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  // submit a post
  @Post('/post')
  async addPost(@Res() resizeBy, @Body() createPostDTO: CreatePostDTO) {
    const newPost = await this.blogService.addPost(createPostDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Post has been submitted successfully!',
      post: newPost,
    });
  }

  // fetch a particular post using ID
  @Get('post/:postID')
  async getPost(@Res() res, @Param('postID', new ValidateObjectId()) postID) {
    const post = await this.blogService.getPost(postID);
    if (!post) {
      throw new NotFoundException('Post does not exist!');
    }

    return res.status(HttpStatus.OK).json(post);
  }

  // fetch all posts
  @Get('posts')
  async getPosts(@Res() res) {
    const posts = await this.blogService.getPosts();

    return res.status(HttpStatus.OK).json(posts);
  }
}
