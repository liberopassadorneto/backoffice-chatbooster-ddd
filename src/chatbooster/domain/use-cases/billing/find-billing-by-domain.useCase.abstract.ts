import { BillingModel } from '@chatbooster/domain/model/billing/billing.model';

export abstract class FindBillingByDomainUseCaseAbstract {
  abstract findByDomain(domain: string): Promise<BillingModel>;
}
