import { FindBillingRepositoryInterface } from '@chatbooster/domain/repositories/find-billing.repository.interface';
import { TYPES } from '@chatbooster/billing/interfaces/types';
import { FindBillingByDomainUseCase } from '@chatbooster/use-cases/billing/find-billing-by-domain/find-billing-by-domain.useCase';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { makeBilling } from '../../factories/billing.factory';

const billingMock = makeBilling();

class MockFindBillingRepository {
  findByDomain = jest.fn().mockResolvedValue(billingMock);
}

describe('FindBillingByDomainUseCase', () => {
  let useCase: FindBillingByDomainUseCase;
  let mockRepository: FindBillingRepositoryInterface;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        FindBillingByDomainUseCase,
        {
          provide: TYPES.repositories.FindBillingRepository,
          useClass: MockFindBillingRepository,
        },
      ],
    }).compile();

    useCase = app.get<FindBillingByDomainUseCase>(FindBillingByDomainUseCase);
    mockRepository = app.get<FindBillingRepositoryInterface>(
      TYPES.repositories.FindBillingRepository,
    );
  });

  describe('findByDomain', () => {
    it('should find billing by domain', async () => {
      const result = await useCase.findByDomain(billingMock.domain);

      expect(mockRepository.findByDomain).toBeCalledWith(billingMock.domain);
      expect(result).toEqual(billingMock);
    });

    it('throws 404 error if billing not found', async () => {
      mockRepository.findByDomain = jest.fn().mockResolvedValue(null);

      await expect(useCase.findByDomain(billingMock.domain)).rejects.toThrow(
        new NotFoundException('Billing not found'),
      );
    });
  });
});
