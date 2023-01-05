import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getORMConfig } from './orm.config';
import { ControllersModule } from '@chatbooster/infra/http/controllers/controllers.module';

@Module({
  imports: [
    // TypeORM
    TypeOrmModule.forRoot(getORMConfig()),

    // Apps module
    ControllersModule,
  ],
})
export class AppModule {}
