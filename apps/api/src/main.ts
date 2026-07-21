import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createLogger } from '@nexusai/logger';
import { parseEnv } from '@nexusai/config';

async function bootstrap() {
  const logger = createLogger({ context: 'ApiBootstrap' });
  const env = parseEnv(process.env);

  const app = await NestFactory.create(AppModule, { logger: false });
  app.setGlobalPrefix('api');

  await app.listen(env.API_PORT, env.API_HOST);
  logger.info('API listening', { host: env.API_HOST, port: env.API_PORT });
}

void bootstrap();
