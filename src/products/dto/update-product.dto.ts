import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsBoolean, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProductDto extends PartialType(CreateProductDto) {

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    @Type( () => Boolean ) // enableImplicitConversions: true
    available: boolean;
}
