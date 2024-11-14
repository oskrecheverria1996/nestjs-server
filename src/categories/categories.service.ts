import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './entities/category.entity';
import { Model } from 'mongoose';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    private notificationsGateway: NotificationsGateway,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const existCategory = await this.categoryModel.findOne({name: createCategoryDto.name });
    if(existCategory) throw new BadRequestException('Una categoria con este nombre ya se encuentra registrada');

    // Notification to emit
    this.notificationsGateway.emitNotification('Se ha creado una categoria');

    const category = this.categoryModel.create(createCategoryDto)
    return category;
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10, search = '{}' } = paginationDto;
    try {

      let query = JSON.parse(search)
      const [total, categories] = await Promise.all([
        this.categoryModel.countDocuments(),

        this.categoryModel.find(query)
        .skip( (page - 1) * limit )
        .limit(limit)
      ]);
    
      return {
        page: {
          number: page,
          limit,
          total,
          next: `/api/categories?page=${page + 1}&limit=${limit}`,
          prev: (page - 1 > 0) ? `/api/categories?page=${ page - 1 }&limit=${limit}` : null,
        },
        content: categories
      };

    } catch (error) {
      throw new InternalServerErrorException();
    }

  }

  async findOne(id: string) {
    const category = await this.categoryModel.findById(id);
    if(!category) throw new NotFoundException(`La categoria con el id: ${id} no fue encontrada`);

    return category
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
       
    const category = await this.findOne(id);

    try {
      await category.updateOne(updateCategoryDto);
      
      // Notification to emit
      this.notificationsGateway.emitNotification('Se ha actualizado una categoria');

      return {
        ...category.toJSON(),
        ...updateCategoryDto
      };
      
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: string) {
        
    await this.findOne(id);

    try {
      
      await this.categoryModel.deleteOne({ _id: id })
      
      // Notification to emit
      this.notificationsGateway.emitNotification('Se ha eliminado una categoria');

      return { message: `Category with id: ${id} was removed`};

    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
