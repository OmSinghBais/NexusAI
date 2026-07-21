import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { PlatformModule } from './platform/platform.module';

@Module({
  imports: [HealthModule, PlatformModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
