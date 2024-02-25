import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { User } from 'src/auth/entities/user.entity';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createCategoryDto: CreateCategoryDto, req: Request, user: User): Promise<import("../post/entities/post.entity").Post & import("./entities/category.entity").Category>;
    findAll(query: any, req: Request, user: User): Promise<import("./entities/category.entity").Category[]>;
    findOne(id: string): Promise<import("./entities/category.entity").Category>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<import("./entities/category.entity").Category>;
    remove(id: string): Promise<{
        success: boolean;
        category: import("./entities/category.entity").Category;
    }>;
}
