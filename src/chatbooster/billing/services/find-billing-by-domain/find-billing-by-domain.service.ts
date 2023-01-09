import { AbstractBillingRepository } from '@chatbooster/billing/abstracts/repositories/billing.repository.abstract';
import { AbstractFindBillingByDomainService } from '@chatbooster/billing/abstracts/services/find-billing-by-domain.service.abstract';
import { BillingModel } from '@chatbooster/billing/model/billing.model';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';

@Injectable()
export class FindBillingByDomainService
  implements AbstractFindBillingByDomainService
{
  constructor(
    @Inject(AbstractBillingRepository)
    private readonly billingRepository: AbstractBillingRepository,
  ) {}

  async findByDomain(domain: string): Promise<BillingModel> {
    const billing = await this.billingRepository.findByDomain(domain);

    if (!billing) {
      throw new NotFoundException('Billing not found');
    }

    return billing;
  }
}
