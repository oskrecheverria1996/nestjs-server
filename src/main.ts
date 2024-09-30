import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  // Only to allow localhost frontend
  app.enableCors({
    origin: ['http://localhost:4200'],
    credentials: true
  });

  /**
   * Swagger OpenApi Configuration 
   */
  const config = new DocumentBuilder()
  .addBasicAuth()
  .setTitle('Mi Api documentation')
  .setDescription('Esta es una Api')
  .setVersion('1.0')
  .addTag('auth')
  .addTag('products')
  .build();
  const document = SwaggerModule.createDocument(app, config, {
    // extraModels: [] // Agregar models para api
  });
  SwaggerModule.setup('api', app, document);

  await app.listen(configService.get('PORT'));
}
bootstrap();
