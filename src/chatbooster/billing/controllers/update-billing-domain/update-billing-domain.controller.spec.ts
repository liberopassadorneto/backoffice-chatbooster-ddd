import {
  makeBilling,
  makeUpdateBillingDomainDto,
} from '@test/factories/billing.factory';
import { UpdateBillingDomainController } from '@chatbooster/billing/controllers/update-billing-domain/update-billing-domain.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateBillingDomainService } from '@chatbooster/billing/services/update-billing-domain/update-billing-domain.service';
import { AbstractUpdateBillingDomainService } from '@chatbooster/billing/abstracts/services/update-billing-domain.service.abstract';

const mockBilling = makeBilling();
const mockUpdateBillingDomainDto = makeUpdateBillingDomainDto();

class MockUpdateBillingDomainService {
  updateDomain = jest.fn().mockResolvedValue(mockBilling);
}

describe('UpdateBillingDomainController', () => {
  let controller: UpdateBillingDomainController;
  let mockService: AbstractUpdateBillingDomainService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateBillingDomainController],
      providers: [
        {
          provide: UpdateBillingDomainService,
          useClass: MockUpdateBillingDomainService,
        },
      ],
    }).compile();

    controller = module.get<UpdateBillingDomainController>(
      UpdateBillingDomainController,
    );

    mockService = module.get<AbstractUpdateBillingDomainService>(
      UpdateBillingDomainService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('updateDomain()', () => {
    it('should update one billing domain', async () => {
      jest.spyOn(mockService, 'updateDomain');

      const currentDomain = mockBilling.domain;

      await controller.updateDomain(currentDomain, mockUpdateBillingDomainDto);

      expect(mockService.updateDomain).toBeCalledWith({
        currentDomain,
        newDomain: mockUpdateBillingDomainDto.newDomain,
      });
    });
  });
});
