import { BillingModel } from '@chatbooster/domain/model/billing/billing.model';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FindBillingByDomainUseCaseAbstract } from '@chatbooster/domain/use-cases/billing/find-billing-by-domain.useCase.abstract';
import { BillingRepositoryAbstract } from '@chatbooster/domain/repositories/billing.repository.abstract';

@Injectable()
export class FindBillingByDomainUseCase
  implements FindBillingByDomainUseCaseAbstract
{
  constructor(
    @Inject(BillingRepositoryAbstract)
    private readonly billingRepository: BillingRepositoryAbstract,
  ) {}

  async findByDomain(domain: string): Promise<BillingModel> {
    const billing = await this.billingRepository.findByDomain(domain);

    if (!billing) {
      throw new NotFoundException('Billing not found');
    }

    return billing;
  }
}
