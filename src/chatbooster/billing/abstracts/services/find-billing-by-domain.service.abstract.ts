import { BillingModel } from '@chatbooster/billing/model/billing.model';

export abstract class AbstractFindBillingByDomainService {
  abstract findByDomain(domain: string): Promise<BillingModel>;
}
