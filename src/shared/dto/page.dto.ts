import { ApiProperty } from "@nestjs/swagger";

export class PageDto {

    @ApiProperty()
    number: number;

    @ApiProperty()
    limit: number;

    @ApiProperty()
    total: number;

    @ApiProperty()
    next: string;

    @ApiProperty()
    prev: string | null;
}