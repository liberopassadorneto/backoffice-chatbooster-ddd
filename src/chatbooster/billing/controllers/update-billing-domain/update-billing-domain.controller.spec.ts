import {
  makeBilling,
  makeUpdateBillingDomainDto,
} from '@test/factories/billing.factory';
import { UpdateBillingDomainController } from '@chatbooster/billing/controllers/update-billing-domain/update-billing-domain.controller';
import { AbstractUpdateBillingDomainUseCase } from '@chatbooster/billing/abstracts/use-cases/update-billing-domain.useCase.abstract';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateBillingDomainUseCase } from '@chatbooster/billing/use-cases/update-billing-domain/update-billing-domain.useCase';

const mockBilling = makeBilling();
const mockUpdateBillingDomainDto = makeUpdateBillingDomainDto();

class MockUpdateBillingDomainUseCase {
  updateDomain = jest.fn().mockResolvedValue(mockBilling);
}

describe('UpdateBillingDomainController', () => {
  let controller: UpdateBillingDomainController;
  let mockUseCase: AbstractUpdateBillingDomainUseCase;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateBillingDomainController],
      providers: [
        {
          provide: UpdateBillingDomainUseCase,
          useClass: MockUpdateBillingDomainUseCase,
        },
      ],
    }).compile();

    controller = module.get<UpdateBillingDomainController>(
      UpdateBillingDomainController,
    );

    mockUseCase = module.get<AbstractUpdateBillingDomainUseCase>(
      UpdateBillingDomainUseCase,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('updateDomain()', () => {
    it('should update one billing domain', async () => {
      jest.spyOn(mockUseCase, 'updateDomain');

      const currentDomain = mockBilling.domain;

      await controller.updateDomain(currentDomain, mockUpdateBillingDomainDto);

      expect(mockUseCase.updateDomain).toBeCalledWith({
        currentDomain,
        newDomain: mockUpdateBillingDomainDto.newDomain,
      });
    });
  });
});
