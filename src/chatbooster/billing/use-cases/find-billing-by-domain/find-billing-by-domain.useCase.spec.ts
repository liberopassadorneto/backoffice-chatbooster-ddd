import { AbstractBillingRepository } from '@chatbooster/billing/abstracts/repositories/billing.repository.abstract';
import { AbstractFindBillingByDomainUseCase } from '@chatbooster/billing/abstracts/use-cases/find-billing-by-domain.useCase.abstract';
import { NotFoundException } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { makeBilling } from '@test/factories/billing.factory';
import { FindBillingByDomainUseCase } from './find-billing-by-domain.useCase';

const mockBilling = makeBilling();

class MockBillingRepository {
  findByDomain = jest.fn().mockResolvedValue(mockBilling);
}

describe('FindBillingByDomainUseCase', () => {
  let useCase: AbstractFindBillingByDomainUseCase;
  let mockRepository: AbstractBillingRepository;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        FindBillingByDomainUseCase,
        {
          provide: AbstractBillingRepository,
          useClass: MockBillingRepository,
        },
      ],
    }).compile();

    useCase = app.get<AbstractFindBillingByDomainUseCase>(
      FindBillingByDomainUseCase,
    );
    mockRepository = app.get<AbstractBillingRepository>(
      AbstractBillingRepository,
    );
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('findByDomain()', () => {
    it('should find one billing by domain', async () => {
      const result = await useCase.findByDomain(mockBilling.domain);

      expect(mockRepository.findByDomain).toBeCalledWith(mockBilling.domain);
      expect(result).toEqual(mockBilling);
    });

    it('throws 404 error if billing not found', async () => {
      mockRepository.findByDomain = jest.fn().mockResolvedValue(null);

      await expect(useCase.findByDomain(mockBilling.domain)).rejects.toThrow(
        new NotFoundException('Billing not found'),
      );
    });
  });
});
