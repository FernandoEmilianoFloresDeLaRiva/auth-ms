import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { envsValues } from './common/config/get-envs-values';

async function bootstrap() {
  const logger = new Logger('Auth MS');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host : '0.0.0.0',
        port: envsValues.PORT,
      },
    },
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen();
  logger.log(`Auth MS is running on port: ${envsValues.PORT}`);
}

bootstrap();
