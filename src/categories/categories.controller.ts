import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponseDto } from 'src/shared/dto/paginated-response.dto';
import { Category } from './entities/category.entity';
import { ApiExtraModels, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { AuthGuard } from 'src/users/guards/auth/auth.guard';

@ApiTags('categories')
@ApiExtraModels(PaginatedResponseDto)
@ApiExtraModels(Category)
@UseGuards(AuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  
  @ApiResponse({
    description: 'Create category',
    schema: {
      $ref: getSchemaPath(Category)
    }
  })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @ApiResponse({
    description: 'The category records',
    schema: {
      $ref: getSchemaPath(PaginatedResponseDto)
    }
  })
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.categoriesService.findAll(paginationDto);
  }

  @ApiResponse({
    description: 'Get a product',
    schema: {
      $ref: getSchemaPath(Category)
    }
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @ApiResponse({
    description: 'Get a product',
    schema: {
      type: 'object'
    }
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }
     
  @ApiResponse({
    description: 'Delete a product',
    schema: {
      type: 'object'
    }
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
