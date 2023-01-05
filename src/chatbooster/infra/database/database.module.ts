import { Module } from '@nestjs/common';
import { BillingRepositoryModule } from './typeorm/repositories/billing/billing.repository.module';

@Module({
  imports: [BillingRepositoryModule],
})
export class DatabaseModule {}
