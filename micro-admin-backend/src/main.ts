import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
const logger = new Logger('Main');
const configService = new ConfigService();

async function bootstrap() {
  const RBM_USER = configService.get<string>('RABBITMQ_USER');
  const RBM_PASSWORD = configService.get<string>('RABBITMQ_PASSWORD');
  const RBM_URL = configService.get<string>('RABBITMQ_URL');
  console.log(RBM_URL, RBM_PASSWORD);
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${RBM_USER}:${RBM_PASSWORD}@${RBM_URL}`],
      noAck: false,
      queue: 'admin-backend',
    },
  });

  await app.listen(() => logger.log('Microservice is listening'));
}
bootstrap();
