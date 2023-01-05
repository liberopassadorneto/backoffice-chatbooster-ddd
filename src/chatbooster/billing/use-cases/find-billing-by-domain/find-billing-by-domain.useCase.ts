import { BillingRepositoryAbstract } from '@chatbooster/billing/abstracts/repositories/billing.repository.abstract';
import { FindBillingByDomainUseCaseAbstract } from '@chatbooster/billing/abstracts/use-cases/find-billing-by-domain.useCase.abstract';
import { BillingModel } from '@chatbooster/billing/model/billing.model';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';

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
