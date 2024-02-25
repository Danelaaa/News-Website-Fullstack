import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { Post } from 'src/post/entities/post.entity';
export declare class CategoryService {
    private readonly repo;
    constructor(repo: Repository<Category>);
    create(createCategoryDto: CreateCategoryDto): Promise<Post & Category>;
    findAll(): Promise<Category[]>;
    findOne(id: number): Promise<Category>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category>;
    remove(id: number): Promise<{
        success: boolean;
        category: Category;
    }>;
}
