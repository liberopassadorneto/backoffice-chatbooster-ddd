import { TypeOrmBillingRepository } from '@chatbooster/infra/database/typeorm/repositories/billing/billing.repository';
import { FindBillingByDomainUseCase } from '@chatbooster/use-cases/billing/find-billing-by-domain/find-billing-by-domain.useCase';
import { UpdateBillingDomainUseCase } from '@chatbooster/use-cases/billing/update-billing-domain/update-billing-domain.useCase';

export const billingProvider = {
  useCases: {
    findByDomainBillingUseCase: {
      provide: FindBillingByDomainUseCase,
      useClass: TypeOrmBillingRepository,
    },
    updateBillingDomainUseCase: {
      provide: UpdateBillingDomainUseCase,
      useClass: TypeOrmBillingRepository,
    },
  },
};
