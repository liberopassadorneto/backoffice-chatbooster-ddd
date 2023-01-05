import { BillingDomain } from '@chatbooster/billing/domain/billing.domain';

export interface UpdateBillingDomain {
  currentDomain: string;
  newDomain: string;
}

export abstract class UpdateBillingDomainUseCaseInterface {
  abstract updateDomain({
    newDomain,
    currentDomain,
  }: UpdateBillingDomain): Promise<void>;
}
