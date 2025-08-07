import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  if (process.env.NODE_ENV !== 'test') {
    app.use(cookieParser());
    app.use(
      csurf({
        cookie: true,
      }),
    );
  }
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const allowedOrigins =
    process.env.CORS_ORIGIN?.split(',').map((o) => o.trim()) ?? [];
  app.enableCors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : false,
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
