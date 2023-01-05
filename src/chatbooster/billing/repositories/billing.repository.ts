import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BillingRepositoryAbstract } from '../abstracts/repositories/billing.repository.abstract';
import { BillingEntity } from '../entities/billing.entity';
import { TypeOrmBillingMapper } from '../mappers/billing.mapper';
import { BillingModel } from '../model/billing.model';

export class TypeOrmBillingRepository implements BillingRepositoryAbstract {
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
