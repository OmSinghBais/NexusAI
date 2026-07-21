import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { SimulationClockModule } from '@nexusai/sim-simulation-clock';

@Module({
  imports: [SimulationClockModule],
  providers: [WorkerService],
})
export class AppModule {}
