import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindBillingRepositoryInterface } from '../../domain/repositories/find-billing.repository.interface';
import { BillingDomain } from '../domain/billing.domain';
import { BillingEntity } from '../domain/billing.entity';

@Injectable()
export class FindBillingRepository implements FindBillingRepositoryInterface {
  constructor(
    @InjectRepository(BillingEntity)
    private readonly billingRepository: Repository<BillingEntity>,
  ) {}

  async findByDomain(domain: string): Promise<BillingDomain | null> {
    const billing = await this.billingRepository.findOneBy({ domain });

    if (!billing) {
      return null;
    }

    return billing;
  }
}
