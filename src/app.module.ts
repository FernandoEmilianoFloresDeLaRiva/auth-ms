import { Module } from '@nestjs/common';
import { HealthController } from './common/health/health.controller';
import { AuthModule } from './auth/infraestructure/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envsValues } from './common/config/get-envs-values';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: envsValues.DB_HOST,
      port: envsValues.DB_PORT,
      username: envsValues.DB_USERNAME,
      password: envsValues.DB_PASSWORD,
      database: envsValues.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    AuthModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
