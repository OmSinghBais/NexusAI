import { Module } from '@nestjs/common';
import { AuthModule } from '@nexusai/service-auth';
import { UserModule } from '@nexusai/service-user';
import { OrganizationModule } from '@nexusai/service-organization';
import { WorkflowModule } from '@nexusai/service-workflow';
import { AgentModule } from '@nexusai/service-agent';
import { OrchestratorModule } from '@nexusai/service-orchestrator';
import { MemoryModule } from '@nexusai/service-memory';
import { NotificationModule } from '@nexusai/service-notification';
import { AnalyticsModule } from '@nexusai/service-analytics';
import { ToolModule } from '@nexusai/service-tool';
import { GatewayModule } from '@nexusai/service-gateway';
import { AuditModule } from '@nexusai/service-audit';
import { WorldEngineModule } from '@nexusai/sim-world-engine';
import { CitizenSystemModule } from '@nexusai/sim-citizen-system';
import { EconomyEngineModule } from '@nexusai/sim-economy-engine';
import { SimulationClockModule } from '@nexusai/sim-simulation-clock';
import { SaveSystemModule } from '@nexusai/sim-save-system';

@Module({
  imports: [
    AuthModule,
    UserModule,
    OrganizationModule,
    WorkflowModule,
    AgentModule,
    OrchestratorModule,
    MemoryModule,
    NotificationModule,
    AnalyticsModule,
    ToolModule,
    GatewayModule,
    AuditModule,
    WorldEngineModule,
    CitizenSystemModule,
    EconomyEngineModule,
    SimulationClockModule,
    SaveSystemModule,
  ],
})
export class PlatformModule {}
