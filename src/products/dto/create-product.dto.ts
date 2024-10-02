import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateProductDto {
    
    @ApiProperty()
    @IsNotEmpty({ message: 'El nombre no debe ser vacio' })
    name: string;
  
    @ApiProperty()
    @IsNotEmpty({ message: 'Debe tener un precio' })
    @IsNumber({}, { message: 'Debe tener un precio valido' })
    @Type( () => Number ) // enableImplicitConversions: true
    price: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'Debe tener una descripcion' })
    description: string;
}
