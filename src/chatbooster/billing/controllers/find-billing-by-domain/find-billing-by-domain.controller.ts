import { BillingModel } from '@chatbooster/billing/model/billing.model';
import { FindBillingByDomainUseCase } from '@chatbooster/billing/use-cases/find-billing-by-domain/find-billing-by-domain.useCase';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('billing')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Billing')
export class FindBillingByDomainController {
  constructor(
    @Inject(FindBillingByDomainUseCase)
    private readonly findBillingByDomainUseCase: FindBillingByDomainUseCase,
  ) {}

  @Get(':domain')
  @ApiOperation({ summary: 'Find one billing by domain' })
  @ApiOkResponse({
    description: 'Find one billing by domain successfully',
    type: BillingModel,
  })
  @ApiNotFoundResponse({
    description: 'Billing not found',
    status: 404,
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
