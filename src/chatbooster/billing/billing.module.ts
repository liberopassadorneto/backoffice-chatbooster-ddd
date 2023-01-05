import { Module } from '@nestjs/common';
import { billingProvider } from './providers/billing.provider';

@Module({
  imports: [...billingProvider.imports],
  controllers: [...billingProvider.controllers],
  providers: [...billingProvider.providers],
})
export class BillingModule {}
