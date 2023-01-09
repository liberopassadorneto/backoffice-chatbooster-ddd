import { UpdateBillingDomainService } from '@chatbooster/billing/services/update-billing-domain/update-billing-domain.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbstractBillingRepository } from '../abstracts/repositories/billing.repository.abstract';
import { BillingEntity } from '../typeorm/entities/billing.entity';
import { TypeOrmBillingRepository } from '../typeorm/repositories/billing.repository';
import { FindBillingByDomainService } from './find-billing-by-domain/find-billing-by-domain.service';

@Module({
  imports: [TypeOrmModule.forFeature([BillingEntity])],
  providers: [
    FindBillingByDomainService,
    { provide: AbstractBillingRepository, useClass: TypeOrmBillingRepository },

    UpdateBillingDomainService,
    { provide: AbstractBillingRepository, useClass: TypeOrmBillingRepository },
  ],
  exports: [FindBillingByDomainService, UpdateBillingDomainService],
})
export class BillingServicesModule {}
