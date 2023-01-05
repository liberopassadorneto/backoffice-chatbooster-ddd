import { faker } from '@faker-js/faker';
import {
  BillingModel,
  BillingModelProps,
} from '@chatbooster/domain/model/billing/billing.model';

type OverrideProps = Partial<BillingModelProps>;

export function makeBilling(override: OverrideProps = {}): BillingModel {
  return new BillingModel({
    domain: faker.internet.domainName(),
    ...override,
  });
}
