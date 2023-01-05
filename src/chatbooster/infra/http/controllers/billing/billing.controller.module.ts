import { Module } from '@nestjs/common';
import { FindBillingByDomainControllerModule } from '@chatbooster/infra/http/controllers/billing/find-billing-by-domain/find-billing-by-domain.controller.module';

@Module({
  imports: [FindBillingByDomainControllerModule],
})
export class BillingControllerModule {}
