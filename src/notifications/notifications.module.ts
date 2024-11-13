import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsGateway } from './notifications.gateway';
import { NotificationsController } from './notifications.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from './entities/notification.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Notification.name,
        schema: NotificationSchema
      }
    ]),
  ],
  providers: [NotificationsGateway, NotificationsService],
  exports: [NotificationsGateway],
  controllers: [NotificationsController]
})
export class NotificationsModule {}
