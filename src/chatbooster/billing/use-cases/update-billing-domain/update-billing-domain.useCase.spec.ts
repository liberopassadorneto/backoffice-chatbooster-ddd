import { BillingRepositoryAbstract } from '@chatbooster/billing/abstracts/repositories/billing.repository.abstract';
import { UpdateBillingDomainUseCaseAbstract } from '@chatbooster/billing/abstracts/use-cases/update-billing-domain.useCase.abstract';
import { faker } from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { makeBilling } from '@test/factories/billing.factory';
import { UpdateBillingDomainUseCase } from './update-billing-domain.useCase';

const mockBilling = makeBilling();

class MockBillingRepository {
  findByDomain = jest.fn().mockResolvedValue(mockBilling);
  save = jest.fn().mockResolvedValue(mockBilling);
}

describe('UpdateBillingDomainUseCase', () => {
  let useCase: UpdateBillingDomainUseCaseAbstract;
  let mockRepository: BillingRepositoryAbstract;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateBillingDomainUseCase,
        {
          provide: BillingRepositoryAbstract,
          useClass: MockBillingRepository,
        },
      ],
    }).compile();

    useCase = app.get<UpdateBillingDomainUseCaseAbstract>(
      UpdateBillingDomainUseCase,
    );
    mockRepository = app.get<BillingRepositoryAbstract>(
      BillingRepositoryAbstract,
    );
  });

  it('should update billing domain', async () => {
    const currentDomain = mockBilling.domain;
    const newDomain = faker.internet.domainName();

    await useCase.updateDomain({
      currentDomain,
      newDomain,
    });

    expect(mockRepository.findByDomain).toBeCalledWith(currentDomain);
    expect(mockRepository.save).toBeCalledWith(mockBilling);

    const billing = await mockRepository.findByDomain(newDomain);
    expect(billing?.domain).toBe(newDomain);
  });

  it('throws 404 error if billing not found', async () => {
    const currentDomain = faker.internet.domainName();
    const newDomain = faker.internet.domainName();

    mockRepository.findByDomain = jest.fn().mockResolvedValue(null);

    await expect(
      useCase.updateDomain({
        currentDomain,
        newDomain,
      }),
    ).rejects.toThrow(new NotFoundException('Billing not found'));
  });
});
