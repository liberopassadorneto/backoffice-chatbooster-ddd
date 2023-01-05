import { UpdateBillingRepository } from '@chatbooster/billing/repositories/update-billing.repository';
import { Repository } from 'typeorm';
import { BillingEntity } from '@chatbooster/billing/domain/billing.entity';

describe('UpdateBillingRepository', () => {
  let repository: UpdateBillingRepository;
  let repositoryMock: Repository<BillingEntity>;
});
