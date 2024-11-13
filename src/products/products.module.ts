import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.schema';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [
    AuthModule,
    NotificationsModule,
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema
      }
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
