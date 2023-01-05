import { BillingModel } from '@chatbooster/billing/model/billing.model';
import { FindBillingByDomainUseCase } from '@chatbooster/billing/use-cases/find-billing-by-domain/find-billing-by-domain.useCase';
import { Controller, Get, Inject, Param } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { BillingPresenter } from '../billing.presenter';

@Controller('billing')
@ApiTags('Billing')
export class FindBillingByDomainController {
  constructor(
    @Inject(FindBillingByDomainUseCase)
    private readonly findBillingByDomainUseCase: FindBillingByDomainUseCase,
  ) {}

  @Get(':domain')
  @ApiOperation({ summary: 'Find billing by domain' })
  @ApiOkResponse({
    description: 'Find billing by domain successfully',
    type: BillingPresenter,
  })
  @ApiNotFoundResponse({
    description: 'Billing not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    status: 500,
  })
  async findByDomain(
    @Param('domain') domain: string,
  ): Promise<BillingModel | null> {
    const billing = await this.findBillingByDomainUseCase.findByDomain(domain);

    return BillingPresenter.toPresenter(billing);
  }
}
