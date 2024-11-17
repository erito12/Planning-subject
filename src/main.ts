import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Subjects')
    .setDescription('API para gestionar subjects')
    .setVersion('1.0')
    .addTag('subjects')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // 'api' es la ruta donde estará Swagger
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
