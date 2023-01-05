import { FindBillingByDomainUseCaseInterface } from '@chatbooster/billing/interfaces/use-cases/find-billing-by-domain.useCase.interface';
import { FindBillingController } from '@chatbooster/billing/controllers/find-billing.controller';
import { makeBilling } from '../../factories/billing.factory';
import { Test, TestingModule } from '@nestjs/testing';
import { TYPES } from '@chatbooster/billing/interfaces/types';

const billingMock = makeBilling();

class MockFindBillingByDomainUseCase {
  findByDomain = jest.fn().mockResolvedValue(billingMock);
}

describe('FindBillingController', () => {
  let controller: FindBillingController;
  let mockFindBillingByDomainUseCase: FindBillingByDomainUseCaseInterface;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindBillingController],
      providers: [
        {
          provide: TYPES.useCases.FindBillingByDomainUseCase,
          useClass: MockFindBillingByDomainUseCase,
        },
      ],
    }).compile();

    controller = module.get<FindBillingController>(FindBillingController);
    mockFindBillingByDomainUseCase =
      module.get<FindBillingByDomainUseCaseInterface>(
        TYPES.useCases.FindBillingByDomainUseCase,
      );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findByDomain', () => {
    it('should find billing by domain', async () => {
      jest.spyOn(mockFindBillingByDomainUseCase, 'findByDomain');

      const result = await controller.findByDomain(billingMock.domain);

      expect(result).toEqual(billingMock);
      expect(mockFindBillingByDomainUseCase.findByDomain).toBeCalledWith(
        billingMock.domain,
      );
    });
  });
});
