import { IsEmail, isEmail, IsNotEmpty, Length, Min } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty({ message: 'El nombre no debe ser vacio' })
    name: string;
  
    @IsNotEmpty({ message: 'El email no debe ser vacio' })
    @IsEmail({}, { message: 'El email debe ser valido' })
    email: string;
  
    emailValidated: boolean;
  
    // @Min(6, { message: 'La contraseña debe ser superior a 6 caracteres' })
    @IsNotEmpty({ message: 'La contraseña no debe ser vacia' })
    @Length(6, 100, { message: 'La contraseña debe ser superior a 6 caracteres' })
    password: string;
  
    img: string;
  
    role: string[];
}
