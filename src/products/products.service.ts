import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './entities/product.schema';
import { PageService } from 'src/shared/page/page.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private jwtService: JwtService) {}

  async create(createProductDto: CreateProductDto, user: string) {
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

  async findAll(page, limit) {

    try {
        const [total, products] = await Promise.all([
          this.productModel.countDocuments(),

          this.productModel.find()
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

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
