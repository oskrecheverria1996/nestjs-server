import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {
    
    @ApiProperty()
    @IsOptional()
    @IsPositive()
    @Type( () => Number ) // enableImplicitConversions: true
    limit?: number;

    @ApiProperty()
    @IsOptional()
    @IsPositive()
    @Min(0)
    @Type( () => Number ) // enableImplicitConversions: true
    page?: number;

    @ApiProperty()
    @IsOptional({always: true})
    search: string
}
