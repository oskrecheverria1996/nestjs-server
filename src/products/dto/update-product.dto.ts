import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsBoolean } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {

    @ApiProperty()
    @IsBoolean()
    available: boolean;
}
