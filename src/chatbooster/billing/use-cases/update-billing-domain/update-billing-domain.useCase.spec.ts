import { AbstractBillingRepository } from '@chatbooster/billing/abstracts/repositories/billing.repository.abstract';
import { AbstractUpdateBillingDomainUseCase } from '@chatbooster/billing/abstracts/use-cases/update-billing-domain.useCase.abstract';
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
  let useCase: AbstractUpdateBillingDomainUseCase;
  let mockRepository: AbstractBillingRepository;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateBillingDomainUseCase,
        {
          provide: AbstractBillingRepository,
          useClass: MockBillingRepository,
        },
      ],
    }).compile();

    useCase = app.get<AbstractUpdateBillingDomainUseCase>(
      UpdateBillingDomainUseCase,
    );
    mockRepository = app.get<AbstractBillingRepository>(
      AbstractBillingRepository,
    );
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('updateDomain()', () => {
    it('should update a billing domain', async () => {
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
});
