import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Headers } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '../auth/guards/auth/auth.guard';
import { ApiBadRequestResponse, ApiExtraModels, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { Product } from './entities/product.schema';
import { PaginatedResponseDto } from 'src/shared/dto/paginated-response.dto';
import { ErrorResponseDto } from 'src/shared/dto/error-response.dto';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';

@ApiTags('products')
@ApiExtraModels(PaginatedResponseDto, ErrorResponseDto, Product)
@ApiBadRequestResponse({
  schema: {
    $ref: getSchemaPath(ErrorResponseDto)
  }
})
@ApiUnauthorizedResponse({
  schema: {
    $ref: getSchemaPath(ErrorResponseDto)
  }
})
@UseGuards(AuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiResponse({
    description: 'Create a product',
    schema: {
      $ref: getSchemaPath(Product)
    }
  })
  @Post()
  create(@Body() createProductDto: CreateProductDto, @Headers('Authorization') auth: string): Promise<Product> {
    return this.productsService.create(createProductDto, auth);
  }

  @ApiResponse({
    description: 'The products record',
    schema: {
      $ref: getSchemaPath(PaginatedResponseDto)
    }
  })
  @Get()
  findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedResponseDto<Product>> {
    return this.productsService.findAll(paginationDto);
  }
  
  @ApiResponse({
    description: 'Get a product',
    schema: {
      $ref: getSchemaPath(Product)
    }
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

   
  @ApiResponse({
    description: 'Get a product',
    schema: {
      type: 'object'
    }
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<any> {
    return this.productsService.update(id, updateProductDto);
  }

   
  @ApiResponse({
    description: 'Delete a product',
    schema: {
      type: 'object'
    }
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<{message: string}> {
    return this.productsService.remove(id);
  }
}
