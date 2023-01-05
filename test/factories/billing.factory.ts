import { faker } from '@faker-js/faker';
import { BillingModel } from '@chatbooster/billing/model/billing.model';

type OverrideProps = Partial<BillingModel>;

export function makeBilling(override: OverrideProps = {}): BillingModel {
  return new BillingModel({
    domain: faker.internet.domainName(),
    ...override,
  });
}
