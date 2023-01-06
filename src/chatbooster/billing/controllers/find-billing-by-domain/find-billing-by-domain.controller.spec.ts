import { AbstractFindBillingByDomainUseCase } from '@chatbooster/billing/abstracts/use-cases/find-billing-by-domain.useCase.abstract';
import { FindBillingByDomainUseCase } from '@chatbooster/billing/use-cases/find-billing-by-domain/find-billing-by-domain.useCase';
import { Test, TestingModule } from '@nestjs/testing';
import { makeBilling } from '@test/factories/billing.factory';
import { FindBillingByDomainController } from './find-billing-by-domain.controller';

const mockBilling = makeBilling();

class MockFindBillingByDomainUseCase {
  findByDomain = jest.fn().mockResolvedValue(mockBilling);
}

describe('FindBillingByDomainController', () => {
  let controller: FindBillingByDomainController;
  let mockUseCase: AbstractFindBillingByDomainUseCase;

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
    mockUseCase = module.get<AbstractFindBillingByDomainUseCase>(
      FindBillingByDomainUseCase,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findByDomain()', () => {
    it('should find one billing by domain', async () => {
      jest.spyOn(mockUseCase, 'findByDomain');

      const result = await controller.findByDomain(mockBilling.domain);

      expect(result).toEqual(mockBilling);
      expect(mockUseCase.findByDomain).toBeCalledWith(mockBilling.domain);
    });
  });
});
