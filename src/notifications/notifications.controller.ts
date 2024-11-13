import { Body, Controller, Get, Patch } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { ApiBadRequestResponse, ApiExtraModels, ApiResponse, ApiTags, ApiUnauthorizedResponse, getSchemaPath } from '@nestjs/swagger';
import { Notification } from './entities/notification.schema';
import { NotificationEntity } from './entities/notification.entity';
import { ErrorResponseDto } from 'src/shared/dto/error-response.dto';

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
export class NotificationsController {

  constructor(private readonly notificationsService: NotificationsService) {}

  @ApiResponse({
    description: 'The products record',
    schema: {
      $ref: getSchemaPath(Array<NotificationEntity>)
    }
  })
  @Get()
  allNotifications(): Promise<Notification[]> {
    return this.notificationsService.findAllNotifications();
  }

  @ApiResponse({
    description: 'Update notification state',
    schema: {
      type: 'object'
    }
  })
  @Patch()
  updateNotifications(@Body() notificationsCollection: Notification[]) {
    return this.notificationsService.updateNotificationsList(notificationsCollection)
  }


}
