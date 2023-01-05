import { makeBilling } from '@chatbooster/billing/test/factories/billing.factory';
import { UpdateBillingRepositoryInterface } from '@chatbooster/domain/repositories/update-billing.repository.interface';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateBillingDomainUseCase } from '@chatbooster/use-cases/billing/update-billing-domain/update-billing-domain.useCase';
import { TYPES } from '@chatbooster/billing/interfaces/types';
import { faker } from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';
import { FindBillingRepositoryInterface } from '@chatbooster/domain/repositories/find-billing.repository.interface';

const billingMock = makeBilling();

class MockFindBillingRepository {
  findByDomain = jest.fn().mockResolvedValue(billingMock);
}

class MockUpdateBillingRepository {
  save = jest.fn().mockResolvedValue(billingMock);
}

describe('UpdateBillingDomainUseCase', () => {
  let useCase: UpdateBillingDomainUseCase;
  let mockUpdateRepository: UpdateBillingRepositoryInterface;
  let mockFindRepository: FindBillingRepositoryInterface;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateBillingDomainUseCase,
        {
          provide: TYPES.repositories.UpdateBillingRepository,
          useClass: MockUpdateBillingRepository,
        },
        {
          provide: TYPES.repositories.FindBillingRepository,
          useClass: MockFindBillingRepository,
        },
      ],
    }).compile();

    useCase = app.get<UpdateBillingDomainUseCase>(UpdateBillingDomainUseCase);
    mockUpdateRepository = app.get<UpdateBillingRepositoryInterface>(
      TYPES.repositories.UpdateBillingRepository,
    );
    mockFindRepository = app.get<FindBillingRepositoryInterface>(
      TYPES.repositories.FindBillingRepository,
    );
  });

  describe('updateDomain', () => {
    it('should update billing domain', async () => {
      const newDomain = faker.internet.domainName();

      await useCase.updateDomain({
        currentDomain: billingMock.domain,
        newDomain,
      });

      expect(mockUpdateRepository.save).toBeCalled();

      const billing = await mockFindRepository.findByDomain(newDomain);

      expect(billing?.domain).toEqual(newDomain);
    });

    it('throws 404 error if billing not found', async () => {
      const newDomain = faker.internet.domainName();

      mockFindRepository.findByDomain = jest.fn().mockResolvedValue(null);

      await expect(
        useCase.updateDomain({
          currentDomain: billingMock.domain,
          newDomain,
        }),
      ).rejects.toThrow(new NotFoundException('Billing not found'));
    });
  });
});
