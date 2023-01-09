import { AbstractBillingRepository } from '@chatbooster/billing/abstracts/repositories/billing.repository.abstract';
import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { makeBilling } from '@test/factories/billing.factory';
import { Repository } from 'typeorm';
import { BillingEntity } from '../entities/billing.entity';
import { TypeOrmBillingRepository } from './billing.repository';

const mockBilling = makeBilling();

describe('TypeOrmBillingRepository', () => {
  let repository: AbstractBillingRepository;
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

    repository = app.get<AbstractBillingRepository>(TypeOrmBillingRepository);
    mockRepository = app.get<Repository<BillingEntity>>(
      getRepositoryToken(BillingEntity),
    );
  });

  describe('findByDomain()', () => {
    it('should find one billing by domain', async () => {
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

  describe('save()', () => {
    it('should save a billing', async () => {
      jest.spyOn(mockRepository, 'save').mockResolvedValue(mockBilling);

      await repository.save(mockBilling);

      expect(mockRepository.save).toHaveBeenCalledWith(mockBilling);

      jest.spyOn(mockRepository, 'findOneBy').mockResolvedValue(mockBilling);

      const billing = await repository.findByDomain(mockBilling.domain);

      expect(billing).toEqual(mockBilling);
    });
  });
});