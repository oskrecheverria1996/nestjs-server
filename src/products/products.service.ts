import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './entities/product.schema';
import { PageService } from 'src/shared/page/page.service';
import { JwtService } from '@nestjs/jwt';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponseDto } from 'src/shared/dto/paginated-response.dto';

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private jwtService: JwtService) {}

  async create(createProductDto: CreateProductDto, user: string): Promise<Product> {
    const existProduct = await this.productModel.findOne({name: createProductDto.name });
    if(existProduct) throw new BadRequestException('Un producto con este nombre ya se encuentra registrado');

    const [type, token] = user?.split(' ') ?? [];

    const userId = await this.jwtService.decode(token).id;
    const product = await this.productModel.create({
      user: userId,
      ...createProductDto
    })

    return product;
  }

  async findAll(paginationDto: PaginationDto): Promise<PaginatedResponseDto<Product>> {

    const { page = 1, limit = 10, search = '{}' } = paginationDto;

    let query = JSON.parse(search)
    try {

      const [total, products] = await Promise.all([
        this.productModel.countDocuments(),

        this.productModel.find(query)
        .skip( (page - 1) * limit )
        .limit(limit)
      ]);

      return {
        page: {
          number: page,
          limit,
          total,
          next: `/api/products?page=${page + 1}&limit=${limit}`,
          prev: (page - 1 > 0) ? `/api/products?page=${ page - 1 }&limit=${limit}` : null,
        },
        content: products
      };

    } catch (error) {
      throw new InternalServerErrorException();
    }

  }

  async findOne(id: string): Promise<any> {

    const product = await this.productModel.findById(id);
    if(!product) throw new NotFoundException(`Producto con el id: ${id} no fue encontrado`);

    return product
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    
    const product = await this.findOne(id);

    try {
      await product.updateOne(updateProductDto);
      return {
        ...product.toJSON(),
        ...updateProductDto
      };
      
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: string): Promise<{message: string}> {
    
    await this.findOne(id);

    try {
      
      await this.productModel.deleteOne({ _id: id })
      return { message: `Product with id: ${id} was removed`};

    } catch (error) {
      throw new InternalServerErrorException();
    }

  }
}
