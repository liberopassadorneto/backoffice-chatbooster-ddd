import { Module } from '@nestjs/common';
import { BillingUseCasesModule } from '../use-cases/billing.useCases.module';
import { FindBillingByDomainController } from './find-billing-by-domain/find-billing-by-domain.controller';
import { UpdateBillingDomainController } from '@chatbooster/billing/controllers/update-billing-domain/update-billing-domain.controller';

@Module({
  imports: [BillingUseCasesModule],
  controllers: [FindBillingByDomainController, UpdateBillingDomainController],
})
export class BillingControllersModule {}
