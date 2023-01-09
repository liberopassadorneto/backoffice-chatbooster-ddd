import { AbstractBillingRepository } from '@chatbooster/billing/abstracts/repositories/billing.repository.abstract';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  AbstractUpdateBillingDomainService,
  UpdateBillingDomainRequest,
} from '@chatbooster/billing/abstracts/services/update-billing-domain.service.abstract';

@Injectable()
export class UpdateBillingDomainService
  implements AbstractUpdateBillingDomainService
{
  constructor(
    @Inject(AbstractBillingRepository)
    private readonly billingRepository: AbstractBillingRepository,
  ) {}

  async updateDomain({
    currentDomain,
    newDomain,
  }: UpdateBillingDomainRequest): Promise<void> {
    const billing = await this.billingRepository.findByDomain(currentDomain);

    if (!billing) {
      throw new NotFoundException('Billing not found');
    }

    billing.domain = newDomain;
    billing.updateDate();

    await this.billingRepository.save(billing);
  }
}
