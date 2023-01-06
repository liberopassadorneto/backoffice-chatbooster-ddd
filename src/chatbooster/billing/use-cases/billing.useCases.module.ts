import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbstractBillingRepository } from '../abstracts/repositories/billing.repository.abstract';
import { BillingEntity } from '../entities/billing.entity';
import { TypeOrmBillingRepository } from '../repositories/billing.repository';
import { FindBillingByDomainUseCase } from './find-billing-by-domain/find-billing-by-domain.useCase';
import { UpdateBillingDomainUseCase } from '@chatbooster/billing/use-cases/update-billing-domain/update-billing-domain.useCase';

@Module({
  imports: [TypeOrmModule.forFeature([BillingEntity])],
  providers: [
    FindBillingByDomainUseCase,
    { provide: AbstractBillingRepository, useClass: TypeOrmBillingRepository },

    UpdateBillingDomainUseCase,
    { provide: AbstractBillingRepository, useClass: TypeOrmBillingRepository },
  ],
  exports: [FindBillingByDomainUseCase, UpdateBillingDomainUseCase],
})
export class BillingUseCasesModule {}
