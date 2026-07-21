import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createLogger } from '@nexusai/logger';

async function bootstrap() {
  const logger = createLogger({ context: 'WorkerBootstrap' });
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: false,
  });
  logger.info('Worker application context started');
  void app;
}

void bootstrap();
