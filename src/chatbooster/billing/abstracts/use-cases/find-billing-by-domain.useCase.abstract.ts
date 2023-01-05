import { BillingModel } from '@chatbooster/billing/model/billing.model';

export abstract class FindBillingByDomainUseCaseAbstract {
  abstract findByDomain(domain: string): Promise<BillingModel>;
}
