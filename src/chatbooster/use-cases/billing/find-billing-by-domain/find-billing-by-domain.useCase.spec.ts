import { makeBilling } from '@chatbooster/billing/test/factories/billing.factory';
import { FindBillingByDomainUseCase } from '@chatbooster/use-cases/billing/find-billing-by-domain/find-billing-by-domain.useCase';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { FindBillingByDomainUseCaseAbstract } from '@chatbooster/domain/use-cases/billing/find-billing-by-domain.useCase.abstract';
import { BillingRepositoryAbstract } from '@chatbooster/domain/repositories/billing.repository.abstract';

const mockBilling = makeBilling();

class MockBillingRepository {
  findByDomain = jest.fn().mockResolvedValue(mockBilling);
}

describe('FindBillingByDomainUseCase', () => {
  let useCase: FindBillingByDomainUseCaseAbstract;
  let mockRepository: BillingRepositoryAbstract;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        FindBillingByDomainUseCase,
        {
          provide: BillingRepositoryAbstract,
          useClass: MockBillingRepository,
        },
      ],
    }).compile();

    useCase = app.get<FindBillingByDomainUseCaseAbstract>(
      FindBillingByDomainUseCase,
    );
    mockRepository = app.get<BillingRepositoryAbstract>(
      BillingRepositoryAbstract,
    );
  });

  it('should find billing by domain', async () => {
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
