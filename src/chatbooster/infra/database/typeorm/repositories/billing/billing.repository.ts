import { BillingModel } from '@chatbooster/domain/model/billing/billing.model';
import { BillingEntity } from '@chatbooster/infra/database/typeorm/entities/billing.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmBillingMapper } from '../../mappers/billing.mapper';
import { BillingRepositoryAbstract } from '@chatbooster/domain/repositories/billing.repository.abstract';

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
