import { BillingModel } from '@chatbooster/billing/model/billing.model';

export abstract class AbstractFindBillingByDomainUseCase {
  abstract findByDomain(domain: string): Promise<BillingModel>;
}
