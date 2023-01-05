import { makeBilling } from '@test/factories/billing.factory';
import { Repository } from 'typeorm';
import { BillingEntity } from '@chatbooster/infra/database/typeorm/entities/billing.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmBillingRepository } from '@chatbooster/infra/database/typeorm/repositories/billing/billing.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BillingRepositoryAbstract } from '@chatbooster/domain/repositories/billing.repository.abstract';

const mockBilling = makeBilling();

describe('TypeOrmBillingRepository', () => {
  let repository: BillingRepositoryAbstract;
  let mockRepository: Repository<BillingEntity>;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        TypeOrmBillingRepository,
        {
          provide: getRepositoryToken(BillingEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    repository = app.get<BillingRepositoryAbstract>(TypeOrmBillingRepository);
    mockRepository = app.get<Repository<BillingEntity>>(
      getRepositoryToken(BillingEntity),
    );
  });

  describe('findByDomain', () => {
    it('should find billing by domain', async () => {
      jest.spyOn(mockRepository, 'findOneBy').mockResolvedValue(mockBilling);

      const billing = await repository.findByDomain(mockBilling.domain);

      expect(billing).toEqual(mockBilling);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({
        domain: mockBilling.domain,
      });
    });

    it('should return null if billing not found', async () => {
      jest.spyOn(mockRepository, 'findOneBy').mockResolvedValue(null);

      const billing = await repository.findByDomain(mockBilling.domain);

      expect(billing).toBeNull();
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({
        domain: mockBilling.domain,
      });
    });
  });

  describe('save', () => {
    it('should save billing', async () => {
      jest.spyOn(mockRepository, 'save').mockResolvedValue(mockBilling);

      await repository.save(mockBilling);

      expect(mockRepository.save).toHaveBeenCalledWith(mockBilling);

      jest.spyOn(mockRepository, 'findOneBy').mockResolvedValue(mockBilling);

      const billing = await repository.findByDomain(mockBilling.domain);

      expect(billing).toEqual(mockBilling);
    });
  });
});
