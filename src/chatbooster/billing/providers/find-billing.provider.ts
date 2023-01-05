import { TYPES } from '../interfaces/types';
import { FindBillingByDomainUseCase } from '../../use-cases/billing/find-billing-by-domain/find-billing-by-domain.useCase';
import { FindBillingController } from '../controllers/find-billing.controller';
import { FindBillingRepository } from '../repositories/find-billing.repository';

const findByDomainBillingUseCase = {
  provide: TYPES.useCases.FindBillingByDomainUseCase,
  useClass: FindBillingByDomainUseCase,
};

const findBillingRepository = {
  provide: TYPES.repositories.FindBillingRepository,
  useClass: FindBillingRepository,
};

export const findBillingProvider = {
  controllers: [FindBillingController],
  providers: [findByDomainBillingUseCase, findBillingRepository],
  exports: [findByDomainBillingUseCase, findBillingRepository],
};
