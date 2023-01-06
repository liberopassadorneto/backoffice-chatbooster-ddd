import { BillingModel } from '@chatbooster/billing/model/billing.model';

export abstract class AbstractBillingRepository {
  abstract findByDomain(domain: string): Promise<BillingModel | null>;
  abstract save(billing: BillingModel): Promise<void>;
}
