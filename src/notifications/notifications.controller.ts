import { Body, Controller, Get, Patch, Query, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { ApiBadRequestResponse, ApiExtraModels, ApiResponse, ApiTags, ApiUnauthorizedResponse, getSchemaPath, ApiBody } from '@nestjs/swagger';
import { Notification } from './entities/notification.schema';
import { NotificationEntity } from './entities/notification.entity';
import { ErrorResponseDto } from 'src/shared/dto/error-response.dto';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponseDto } from 'src/shared/dto/paginated-response.dto';

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
      $ref: getSchemaPath(PaginatedResponseDto)
    }
  })
  @Get()
  allNotifications(@Query() paginationDto: PaginationDto): Promise<PaginatedResponseDto<Notification>> {
    return this.notificationsService.findAllNotifications(paginationDto);
  }

  
  @ApiResponse({
    description: 'Not read notifications number',
    type: [NotificationEntity]
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
  async updateNotifications() {
    return await this.notificationsService.updateNotificationsList()
  }


}
