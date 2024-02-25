import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { Post } from 'src/post/entities/post.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly repo: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const category = new Post();
    category.userId = 1;
    Object.assign(category,createCategoryDto);
    
    this.repo.create(category);
    return await this.repo.save(category);
  }

  async findAll(): Promise<Category[]> {
    return this.repo.find();
  }

  async findOne(id: number) {
    const options: FindOneOptions<Category> = { where: { id } };
    const category = await this.repo.findOne(options);
    if (!category) {
      throw new BadRequestException('category not found');
    }
    return category;
  }

  async update(id:number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.repo.findOne({ where: { id } });
    if(!category){
      throw new BadRequestException('category not found');
    }
    
    await this.repo.update({id:category.id},{title:updateCategoryDto.title})

    Object.assign(category,updateCategoryDto);
    return this.repo.save(category);
  }

  async remove(id: number) {
    const category = await this.repo.findOne({ where: { id } });

    if(!category){
      throw new BadRequestException('category not found');
    }

    await this.repo.remove(category);
    return {success:true,category};
  }
}
