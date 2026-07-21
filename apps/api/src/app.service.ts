import { Injectable } from '@nestjs/common';
import { createLogger } from '@nexusai/logger';

@Injectable()
export class AppService {
  private readonly logger = createLogger({ context: 'ApiAppService' });

  getRoot() {
    this.logger.info('Root endpoint accessed');
    return {
      status: 'success',
      message: 'NexusAI API',
      data: { products: ['aios', 'civilization-simulator'] },
      timestamp: new Date().toISOString(),
    };
  }
}
