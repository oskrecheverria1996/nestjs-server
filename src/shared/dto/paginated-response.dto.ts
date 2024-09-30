import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { PageDto } from "./page.dto";

@ApiExtraModels(PageDto)
export class PaginatedResponseDto<T> {

    @ApiProperty()
    page: PageDto;

    @ApiProperty()
    content: T[];
}