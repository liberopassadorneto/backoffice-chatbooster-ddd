import { Module } from '@nestjs/common';
import { FindBillingByDomainUseCase } from '@chatbooster/use-cases/billing/find-billing-by-domain/find-billing-by-domain.useCase';
import { FindBillingByDomainController } from '@chatbooster/infra/http/controllers/billing/find-billing-by-domain/find-billing-by-domain.controller';

@Module({
  imports: [FindBillingByDomainUseCase],
  controllers: [FindBillingByDomainController],
})
export class FindBillingByDomainControllerModule {}
