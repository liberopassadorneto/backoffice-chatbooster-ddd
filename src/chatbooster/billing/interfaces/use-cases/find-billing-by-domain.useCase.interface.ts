import { BillingDomain } from '@chatbooster/billing/domain/billing.domain';

export interface FindBillingByDomainUseCaseInterface {
  findByDomain(domain: string): Promise<BillingDomain | null>;
}
