import { BillingRepositoryAbstract } from '@chatbooster/billing/abstracts/repositories/billing.repository.abstract';
import { FindBillingByDomainUseCaseAbstract } from '@chatbooster/billing/abstracts/use-cases/find-billing-by-domain.useCase.abstract';
import { NotFoundException } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { makeBilling } from '@test/factories/billing.factory';
import { FindBillingByDomainUseCase } from './find-billing-by-domain.useCase';

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
