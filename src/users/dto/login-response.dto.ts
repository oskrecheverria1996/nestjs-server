import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { User } from "../schemas/user.schema";

@ApiExtraModels(User)
export class LoginResponseDto {

    @ApiProperty()
    token: string;

    @ApiProperty()
    user: User;

}
