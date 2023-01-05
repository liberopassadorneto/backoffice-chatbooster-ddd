import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BillingRepository } from '@chatbooster/domain/repositories/billing.repository.interface';
import { TYPES } from '@chatbooster/domain/constants/billing-proxy';

interface UpdateBillingDomainRequest {
  currentDomain: string;
  newDomain: string;
}

@Injectable()
export class UpdateBillingDomainUseCase {
  constructor(
    @Inject(TYPES.repositories.BillingRepository)
    private readonly billingRepository: BillingRepository,
  ) {}

  async execute({
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
