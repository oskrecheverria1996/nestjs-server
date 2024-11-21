import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Notification, NotificationDocument } from './entities/notification.schema';
import { Model } from 'mongoose';
import { map } from 'rxjs';
import { NotificationEntity } from './entities/notification.entity';
import { PaginatedResponseDto } from 'src/shared/dto/paginated-response.dto';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

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

  async findAllNotifications(paginationDto: PaginationDto): Promise<PaginatedResponseDto<Notification>> {

    const { page = 1, limit = 10} = paginationDto;
    
    try {

      const [total, notifications] = await Promise.all([
        this.notificationModel.countDocuments(),

        this.notificationModel.find().sort({date: -1})
        .skip( (page - 1) * limit )
        .limit(limit)
      ]);
      
      return {
        page: {
          number: page,
          limit,
          total,
          next: `/api/products?page=${page + 1}&limit=${limit}`,
          prev: (page - 1 > 0) ? `/api/products?page=${ page - 1 }&limit=${limit}` : null,
        },
        content: notifications
      };
      
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateNotificationsList() {
    try {
      const notifications = await this.notificationModel.updateMany(
        { isRead: false },
        { $set: { isRead: true } },
        { multi: true }
      );
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

        this.notificationModel.find(query).sort({date: -1})
      ]);

      return [total, notifications];
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  
}
