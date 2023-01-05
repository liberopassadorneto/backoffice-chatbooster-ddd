import { BillingModule } from '@chatbooster/billing/billing.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getORMConfig } from './orm.config';

@Module({
  imports: [TypeOrmModule.forRoot(getORMConfig()), BillingModule],
})
export class AppModule {}
