import { UpdateBillingRepositoryInterface } from '@chatbooster/domain/repositories/update-billing.repository.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BillingEntity } from '@chatbooster/billing/domain/billing.entity';
import { Repository } from 'typeorm';
import { BillingDomain } from '../domain/billing.domain';

@Injectable()
export class UpdateBillingRepository
  implements UpdateBillingRepositoryInterface
{
  constructor(
    @InjectRepository(BillingEntity)
    private readonly billingRepository: Repository<BillingEntity>,
  ) {}

  async save(billing: BillingDomain): Promise<void> {
    await this.billingRepository.update(billing.id, billing);
  }
}
