import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Headers } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '../users/guards/auth/auth.guard';
import { ApiExtraModels, ApiOkResponse, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { Product } from './entities/product.schema';
import { PaginatedResponseDto } from 'src/shared/dto/paginated-response.dto';

@ApiTags('products')
@UseGuards(AuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto, @Headers('Authorization') auth: string) {
    return this.productsService.create(createProductDto, auth);
  }

  @ApiExtraModels(PaginatedResponseDto)
  @ApiResponse({
    description: 'The product records',
    schema: {
      $ref: getSchemaPath(PaginatedResponseDto)
    }
  })
  @Get()
  findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedResponseDto<Product>> {
    return this.productsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
