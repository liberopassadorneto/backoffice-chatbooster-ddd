import { BillingModel } from '@chatbooster/domain/model/billing/billing.model';
import { FindBillingByDomainUseCase } from '@chatbooster/use-cases/billing/find-billing-by-domain/find-billing-by-domain.useCase';
import { Controller, Get, Inject, Param } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

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
    type: BillingModel,
  })
  @ApiNotFoundResponse({
    description: 'Billing is not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    status: 500,
  })
  async findByDomain(
    @Param('domain') domain: string,
  ): Promise<BillingModel | null> {
    return await this.findBillingByDomainUseCase.findByDomain(domain);
  }
}
