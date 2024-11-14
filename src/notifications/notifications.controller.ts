import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { ApiBadRequestResponse, ApiExtraModels, ApiResponse, ApiTags, ApiUnauthorizedResponse, getSchemaPath } from '@nestjs/swagger';
import { Notification } from './entities/notification.schema';
import { NotificationEntity } from './entities/notification.entity';
import { ErrorResponseDto } from 'src/shared/dto/error-response.dto';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';

@ApiTags('notifications')
@Controller('notifications')
@ApiExtraModels(NotificationEntity)
@ApiBadRequestResponse({
  schema: {
    $ref: getSchemaPath(ErrorResponseDto)
  }
})
@ApiUnauthorizedResponse({
  schema: {
    $ref: getSchemaPath(ErrorResponseDto)
  }
})
@UseGuards(AuthGuard)
export class NotificationsController {

  constructor(private readonly notificationsService: NotificationsService) {}

  @ApiResponse({
    description: 'The notifications record',
    schema: {
      $ref: getSchemaPath(Array<NotificationEntity>)
    }
  })
  @Get()
  allNotifications(): Promise<Notification[]> {
    return this.notificationsService.findAllNotifications();
  }

  
  @ApiResponse({
    description: 'Not read notifications number',
    schema: {
      $ref: getSchemaPath(Array<NotificationEntity>)
    }
  })
  @Get('notReadNotifications')
  async getNotReadNotifications(): Promise<Notification[]>  {
    const [total, notifications] = await this.notificationsService.getNotReadNotifications();
    return notifications;
  }

  @ApiResponse({
    description: 'Update notification state',
    schema: {
      type: 'object'
    }
  })
  @Patch()
  updateNotifications() {
    return this.notificationsService.updateNotificationsList()
  }


}
