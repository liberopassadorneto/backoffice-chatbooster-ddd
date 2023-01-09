import { AbstractFindBillingByDomainService } from '@chatbooster/billing/abstracts/services/find-billing-by-domain.service.abstract';
import { FindBillingByDomainService } from '@chatbooster/billing/services/find-billing-by-domain/find-billing-by-domain.service';
import { Test, TestingModule } from '@nestjs/testing';
import { makeBilling } from '@test/factories/billing.factory';
import { FindBillingByDomainController } from './find-billing-by-domain.controller';

const mockBilling = makeBilling();

class MockFindBillingByDomainService {
  findByDomain = jest.fn().mockResolvedValue(mockBilling);
}

describe('FindBillingByDomainController', () => {
  let controller: FindBillingByDomainController;
  let mockService: AbstractFindBillingByDomainService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindBillingByDomainController],
      providers: [
        {
          provide: FindBillingByDomainService,
          useClass: MockFindBillingByDomainService,
        },
      ],
    }).compile();

    controller = module.get<FindBillingByDomainController>(
      FindBillingByDomainController,
    );
    mockService = module.get<AbstractFindBillingByDomainService>(
      FindBillingByDomainService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findByDomain()', () => {
    it('should find one billing by domain', async () => {
      jest.spyOn(mockService, 'findByDomain');

      const result = await controller.findByDomain(mockBilling.domain);

      expect(result).toEqual(mockBilling);
      expect(mockService.findByDomain).toBeCalledWith(mockBilling.domain);
    });
  });
});
