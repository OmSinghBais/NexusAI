import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

// TODO: Import feature modules (AuthModule, UsersModule, OrganizationsModule)

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100,
    }]),
    // AuthModule,
    // UsersModule,
    // OrganizationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
