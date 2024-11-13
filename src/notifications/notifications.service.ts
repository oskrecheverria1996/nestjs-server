import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Notification, NotificationDocument } from './entities/notification.schema';
import { Model } from 'mongoose';
import { map } from 'rxjs';

@Injectable()
export class NotificationsService {

  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
  ) {}

  async saveNotification(message: CreateNotificationDto): Promise<number> {
    try {
      const notification = await this.notificationModel.create({
        ...message,
        date: new Date(),
        user: '66e9899765b8f7d96f698fc1'
      });

      const [total, notifications] = await this.getNotReadNotifications();
      return total;

    } catch (error) {
      throw new InternalServerErrorException();
    } 
  }

  async findAllNotifications(): Promise<Notification[]> {
    try {
      const notifications = await this.notificationModel.find();
      return notifications;
      
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateNotificationsList(notificationsList) {
    const idList = notificationsList.map(x => x.id);
    try {
      const notifications = await this.notificationModel.updateMany();
      return notifications;
      
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getNotReadNotifications(): Promise<[number, Notification[]]> {
    try {
      const query = {isRead: {$eq: false}}
      const [total, notifications] = await Promise.all([
        this.notificationModel.countDocuments(query),

        this.notificationModel.find(query)
      ]);

      return [total, notifications];
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  
}
