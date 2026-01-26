import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/exceptionGlobal';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import helmet from 'helmet';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3001;
  const nodeEnv = configService.get<string>('NODE_ENV') || 'development';
  // 1. Helmet: Bảo mật HTTP headers
  app.use(helmet());
  // 2. CORS Strict: Chỉ cho phép Origin từ Frontend
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });
  app.setGlobalPrefix('api/v1');
  // 3. Validation Global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  if (nodeEnv !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('EMR Patient System')
      .setDescription('Hệ thống quản lý bệnh nhân API')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }
  // 5. Global Filters & Guards
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  console.log(`Application is running on: http://localhost:${port}`);
  await app.listen(port);
}
bootstrap();
