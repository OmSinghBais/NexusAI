import { Injectable, OnModuleInit } from '@nestjs/common';
import { createLogger } from '@nexusai/logger';

@Injectable()
export class WorkerService implements OnModuleInit {
  private readonly logger = createLogger({ context: 'WorkerService' });

  onModuleInit() {
    this.logger.info('Worker process initialized');
  }
}
