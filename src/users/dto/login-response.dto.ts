import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { User } from "../schemas/user.schema";

export class LoginResponseDto {

    @ApiProperty()
    token: string;

    @ApiProperty()
    user: User;

}
