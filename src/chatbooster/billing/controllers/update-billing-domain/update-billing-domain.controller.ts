import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Inject,
  Param,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateBillingDomainService } from '@chatbooster/billing/services/update-billing-domain/update-billing-domain.service';
import { UpdateBillingDomainDto } from '../dtos/update-billing-domain.dto';

@Controller('billing')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Billing')
export class UpdateBillingDomainController {
  constructor(
    @Inject(UpdateBillingDomainService)
    private readonly updateBillingDomainService: UpdateBillingDomainService,
  ) {}

  @Patch(':currentDomain/update')
  @ApiOperation({ summary: 'Update billing domain' })
  @ApiOkResponse({
    description: 'Update billing domain successfully',
  })
  @ApiNotFoundResponse({
    description: 'Billing not found',
    status: 404,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    status: 500,
  })
  @ApiParam({
    name: 'currentDomain',
    description: 'The domain that you want to update',
    required: true,
  })
  @ApiBody({
    type: UpdateBillingDomainDto,
    description: 'The new value of the domain',
    required: true,
  })
  async updateDomain(
    @Param('currentDomain') currentDomain: string,
    @Body() { newDomain }: UpdateBillingDomainDto,
  ): Promise<void> {
    await this.updateBillingDomainService.updateDomain({
      currentDomain,
      newDomain,
    });
  }
}
