import { AbstractBillingRepository } from '@chatbooster/billing/abstracts/repositories/billing.repository.abstract';
import { faker } from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { makeBilling } from '@test/factories/billing.factory';
import { UpdateBillingDomainService } from './update-billing-domain.service';
import { AbstractUpdateBillingDomainService } from '@chatbooster/billing/abstracts/services/update-billing-domain.service.abstract';

const mockBilling = makeBilling();

class MockBillingRepository {
  findByDomain = jest.fn().mockResolvedValue(mockBilling);
  save = jest.fn().mockResolvedValue(mockBilling);
}

describe('UpdateBillingDomainService', () => {
  let service: AbstractUpdateBillingDomainService;
  let mockRepository: AbstractBillingRepository;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateBillingDomainService,
        {
          provide: AbstractBillingRepository,
          useClass: MockBillingRepository,
        },
      ],
    }).compile();

    service = app.get<AbstractUpdateBillingDomainService>(
      UpdateBillingDomainService,
    );
    mockRepository = app.get<AbstractBillingRepository>(
      AbstractBillingRepository,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('updateDomain()', () => {
    it('should update a billing domain', async () => {
      const currentDomain = mockBilling.domain;
      const newDomain = faker.internet.domainName();

      await service.updateDomain({
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
        service.updateDomain({
          currentDomain,
          newDomain,
        }),
      ).rejects.toThrow(new NotFoundException('Billing not found'));
    });
  });
});
