import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingEntity } from '@chatbooster/infra/database/typeorm/entities/billing.entity';
import { BillingRepositoryAbstract } from '@chatbooster/domain/repositories/billing.repository.abstract';
import { TypeOrmBillingRepository } from '@chatbooster/infra/database/typeorm/repositories/billing/billing.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BillingEntity])],
  providers: [
    {
      provide: BillingRepositoryAbstract,
      useClass: TypeOrmBillingRepository,
    },
  ],
  exports: [BillingRepositoryAbstract, TypeOrmBillingRepository],
})
export class BillingRepositoryModule {}
