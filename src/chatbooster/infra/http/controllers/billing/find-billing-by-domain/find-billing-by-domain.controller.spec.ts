import { FindBillingByDomainUseCase } from '@chatbooster/use-cases/billing/find-billing-by-domain/find-billing-by-domain.useCase';
import { Test, TestingModule } from '@nestjs/testing';
import { makeBilling } from '@test/factories/billing.factory';
import { FindBillingByDomainController } from './find-billing-by-domain.controller';
import { FindBillingByDomainUseCaseAbstract } from '@chatbooster/domain/use-cases/billing/find-billing-by-domain.useCase.abstract';

const mockBilling = makeBilling();

class MockFindBillingByDomainUseCase {
  findByDomain = jest.fn().mockResolvedValue(mockBilling);
}

describe('FindBillingController', () => {
  let controller: FindBillingByDomainController;
  let mockUseCase: FindBillingByDomainUseCaseAbstract;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindBillingByDomainController],
      providers: [
        {
          provide: FindBillingByDomainUseCase,
          useClass: MockFindBillingByDomainUseCase,
        },
      ],
    }).compile();

    controller = module.get<FindBillingByDomainController>(
      FindBillingByDomainController,
    );
    mockUseCase = module.get<FindBillingByDomainUseCaseAbstract>(
      FindBillingByDomainUseCase,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findByDomain', () => {
    it('should find billing by domain', async () => {
      jest.spyOn(mockUseCase, 'findByDomain');

      const result = await controller.findByDomain(mockBilling.domain);

      expect(result).toEqual(mockBilling);
      expect(mockUseCase.findByDomain).toBeCalledWith(mockBilling.domain);
    });
  });
});
