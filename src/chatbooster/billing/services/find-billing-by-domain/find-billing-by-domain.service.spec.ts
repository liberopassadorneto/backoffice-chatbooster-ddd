import { AbstractBillingRepository } from '@chatbooster/billing/abstracts/repositories/billing.repository.abstract';
import { AbstractFindBillingByDomainService } from '@chatbooster/billing/abstracts/services/find-billing-by-domain.service.abstract';
import { NotFoundException } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { makeBilling } from '@test/factories/billing.factory';
import { FindBillingByDomainService } from './find-billing-by-domain.service';

const mockBilling = makeBilling();

class MockBillingRepository {
  findByDomain = jest.fn().mockResolvedValue(mockBilling);
}

describe('FindBillingByDomainService', () => {
  let service: AbstractFindBillingByDomainService;
  let mockRepository: AbstractBillingRepository;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        FindBillingByDomainService,
        {
          provide: AbstractBillingRepository,
          useClass: MockBillingRepository,
        },
      ],
    }).compile();

    service = app.get<AbstractFindBillingByDomainService>(
      FindBillingByDomainService,
    );
    mockRepository = app.get<AbstractBillingRepository>(
      AbstractBillingRepository,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findByDomain()', () => {
    it('should find one billing by domain', async () => {
      const result = await service.findByDomain(mockBilling.domain);

      expect(mockRepository.findByDomain).toBeCalledWith(mockBilling.domain);
      expect(result).toEqual(mockBilling);
    });

    it('throws 404 error if billing not found', async () => {
      mockRepository.findByDomain = jest.fn().mockResolvedValue(null);

      await expect(service.findByDomain(mockBilling.domain)).rejects.toThrow(
        new NotFoundException('Billing not found'),
      );
    });
  });
});
