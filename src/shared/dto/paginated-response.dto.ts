import { ApiProperty } from "@nestjs/swagger";
import { PageDto } from "./page.dto";

export class PaginatedResponseDto<T> {

    @ApiProperty()
    page: PageDto;

    @ApiProperty()
    content: T[];
}