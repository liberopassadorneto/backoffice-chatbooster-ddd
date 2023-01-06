import { AbstractBillingRepository } from '@chatbooster/billing/abstracts/repositories/billing.repository.abstract';
import {
  AbstractUpdateBillingDomainUseCase,
  UpdateBillingDomainRequest,
} from '@chatbooster/billing/abstracts/use-cases/update-billing-domain.useCase.abstract';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';

@Injectable()
export class UpdateBillingDomainUseCase
  implements AbstractUpdateBillingDomainUseCase
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
