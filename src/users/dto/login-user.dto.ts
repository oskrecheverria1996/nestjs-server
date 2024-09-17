import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class LoginUserDto {

    @ApiProperty()
    @IsNotEmpty({ message: 'El email no debe estar vacio' })
    @IsEmail({}, { message: 'El email debe ser valido' })
    email: string;
  
    // emailValidated: boolean;
  
    @ApiProperty()
    @IsNotEmpty({ message: 'La contraseña no debe estar vacia' })
    @Length(6, 100, { message: 'La contraseña debe ser superior a 6 caracteres' })
    password: string;

}
