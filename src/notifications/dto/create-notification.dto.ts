import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class CreateNotificationDto {
        
    @ApiProperty()
    @IsNotEmpty({ message: 'La notificacion debe tener un mensaje' })
    message: string;
  
    // @ApiProperty()
    // @IsNotEmpty({ message: 'La notificacion debe tener una fecha' })
    // @IsDate()
    // @Type( () => Date ) // enableImplicitConversions: true
    // date: Date;
}
