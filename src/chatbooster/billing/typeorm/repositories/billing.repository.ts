import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BillingEntity } from '../entities/billing.entity';
import { TypeOrmBillingMapper } from '../mappers/billing.mapper';
import { Injectable } from '@nestjs/common';
import { AbstractBillingRepository } from '@chatbooster/billing/abstracts/repositories/billing.repository.abstract';
import { BillingModel } from '@chatbooster/billing/model/billing.model';

@Injectable()
export class TypeOrmBillingRepository implements AbstractBillingRepository {
  constructor(
    @InjectRepository(BillingEntity)
    private readonly billingRepository: Repository<BillingEntity>,
  ) {}

  async findByDomain(domain: string): Promise<BillingModel | null> {
    const billing = await this.billingRepository.findOneBy({ domain });

    if (!billing) {
      return null;
    }

    return TypeOrmBillingMapper.toModel(billing);
  }

  async save(billing: BillingModel): Promise<void> {
    await this.billingRepository.save(billing);
  }
}
