import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { User } from 'src/auth/entities/user.entity';
import { CurrentUser } from 'src/auth/user.decorator';
import { UseRoles } from 'nest-access-control';

@Controller('category')
@UseInterceptors(ClassSerializerInterceptor)

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}



  @Post()
  @UseRoles({
    possession:'any',
    action:'create',
    resource: 'category'
  })
  create(@Body() createCategoryDto: CreateCategoryDto,@Req() req:Request,@CurrentUser() user:User) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.categoryService.create(createCategoryDto,req.user as User);
  }

  @Get()
  findAll(@Query() query:any,@Req() req:Request,@CurrentUser() user:User) {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  @UseRoles({
    possession:'any',
    action:'update',
    resource: 'category'
  })
  update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @UseRoles({
    possession:'any',
    action:'delete',
    resource: 'category'
  })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
