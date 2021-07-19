import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClientProxySmartRanking {
  constructor(private configService: ConfigService) {}

  getClientProxyAdminBackendInstance(): ClientProxy {
    const RBM_USER = this.configService.get<string>('RABBITMQ_USER');
    const RBM_PASSWORD = this.configService.get<string>('RABBITMQ_PASSWORD');
    const RBM_URL = this.configService.get<string>('RABBITMQ_URL');

    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${RBM_USER}:${RBM_PASSWORD}@${RBM_URL}`],
        queue: 'admin-backend',
      },
    });
  }

  getClientProxyDesafiosInstance(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${this.configService.get<string>(
            'RABBITMQ_USER',
          )}:${this.configService.get<string>(
            'RABBITMQ_PASSWORD',
          )}@${this.configService.get<string>('RABBITMQ_URL')}`,
        ],
        queue: 'desafios',
      },
    });
  }
}
