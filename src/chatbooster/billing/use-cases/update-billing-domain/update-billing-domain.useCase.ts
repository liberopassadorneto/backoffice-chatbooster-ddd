import { BillingRepositoryAbstract } from '@chatbooster/billing/abstracts/repositories/billing.repository.abstract';
import {
  UpdateBillingDomainUseCaseAbstract,
  UpdateBillingDomainRequest,
} from '@chatbooster/billing/abstracts/use-cases/update-billing-domain.useCase.abstract';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';

@Injectable()
export class UpdateBillingDomainUseCase
  implements UpdateBillingDomainUseCaseAbstract
{
  constructor(
    @Inject(BillingRepositoryAbstract)
    private readonly billingRepository: BillingRepositoryAbstract,
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
