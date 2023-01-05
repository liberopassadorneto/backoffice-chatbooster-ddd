import { makeBilling } from '@test/factories/billing.factory';
import { UpdateBillingDomainUseCase } from './update-billing-domain.useCase';
import { BillingRepository } from '@chatbooster/domain/repositories/billing.repository.interface';
import { Test, TestingModule } from '@nestjs/testing';
import { TYPES } from '@chatbooster/domain/constants/billing-proxy';
import { faker } from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';

const mockBilling = makeBilling();

class MockBillingRepository {
  findByDomain = jest.fn().mockResolvedValue(mockBilling);
  save = jest.fn().mockResolvedValue(mockBilling);
}

describe('UpdateBillingDomainUseCase', () => {
  let useCase: UpdateBillingDomainUseCase;
  let mockRepository: BillingRepository;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateBillingDomainUseCase,
        {
          provide: TYPES.repositories.BillingRepository,
          useClass: MockBillingRepository,
        },
      ],
    }).compile();

    useCase = app.get<UpdateBillingDomainUseCase>(UpdateBillingDomainUseCase);
    mockRepository = app.get<BillingRepository>(
      TYPES.repositories.BillingRepository,
    );
  });

  it('should update billing domain', async () => {
    const currentDomain = mockBilling.domain;
    const newDomain = faker.internet.domainName();

    await useCase.execute({
      currentDomain,
      newDomain,
    });

    expect(mockRepository.findByDomain).toBeCalledWith(currentDomain);
    expect(mockRepository.save).toBeCalledWith(mockBilling);

    const billing = await mockRepository.findByDomain(newDomain);
    expect(billing.domain).toBe(newDomain);
  });

  it('throws 404 error if billing not found', async () => {
    const currentDomain = faker.internet.domainName();
    const newDomain = faker.internet.domainName();

    mockRepository.findByDomain = jest.fn().mockResolvedValue(null);

    await expect(
      useCase.execute({
        currentDomain,
        newDomain,
      }),
    ).rejects.toThrow(new NotFoundException('Billing not found'));
  });
});
