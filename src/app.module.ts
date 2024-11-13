import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from "@nestjs/mongoose";
import { ProductsModule } from './products/products.module';
import { PageService } from './shared/page/page.service';
import { CategoriesModule } from './categories/categories.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    ProductsModule,
    CategoriesModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PageService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
})
export class AppModule {}
