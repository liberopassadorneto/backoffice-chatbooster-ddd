import { Module } from '@nestjs/common';
import { BillingServicesModule } from '../services/billing.services.module';
import { FindBillingByDomainController } from './find-billing-by-domain/find-billing-by-domain.controller';
import { UpdateBillingDomainController } from '@chatbooster/billing/controllers/update-billing-domain/update-billing-domain.controller';

@Module({
  imports: [BillingServicesModule],
  controllers: [FindBillingByDomainController, UpdateBillingDomainController],
})
export class BillingControllersModule {}
