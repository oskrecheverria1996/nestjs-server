import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCategoryDto {
        
    @ApiProperty()
    @IsNotEmpty({ message: 'El nombre no debe ser vacio' })
    name: string; 

    @ApiProperty()
    @IsNotEmpty({ message: 'Debe tener una descripcion' })
    description: string;
}
