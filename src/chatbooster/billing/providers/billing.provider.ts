import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingRepositoryAbstract } from '../abstracts/repositories/billing.repository.abstract';
import { FindBillingByDomainUseCaseAbstract } from '../abstracts/use-cases/find-billing-by-domain.useCase.abstract';
import { FindBillingByDomainController } from '../controllers/find-billing-by-domain/find-billing-by-domain.controller';
import { BillingEntity } from '../entities/billing.entity';
import { TypeOrmBillingRepository } from '../repositories/billing.repository';
import { FindBillingByDomainUseCase } from '../use-cases/find-billing-by-domain/find-billing-by-domain.useCase';

export const billingProvider = {
  imports: [TypeOrmModule.forFeature([BillingEntity])],
  controllers: [FindBillingByDomainController],
  providers: [
    // Repositories
    TypeOrmBillingRepository,
    {
      provide: BillingRepositoryAbstract,
      useClass: TypeOrmBillingRepository,
    },

    // Use cases
    FindBillingByDomainUseCase,
    {
      provide: FindBillingByDomainUseCaseAbstract,
      useClass: FindBillingByDomainUseCase,
    },
  ],
};
