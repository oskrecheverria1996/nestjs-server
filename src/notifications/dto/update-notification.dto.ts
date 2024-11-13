import { PartialType } from '@nestjs/mapped-types';
import { CreateNotificationDto } from './create-notification.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {
  
  @ApiProperty()
  @IsNotEmpty({ message: 'La notificacion debe tener un id' })
  id: number;

  @ApiProperty()
  @IsBoolean()
  @Type( () => Boolean ) // enableImplicitConversions: true
  isRead: boolean;
  
}
