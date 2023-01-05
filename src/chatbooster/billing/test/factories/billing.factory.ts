import { BillingEntity } from '@chatbooster/billing/domain/billing.entity';
import { faker } from '@faker-js/faker';

type OverrideProps = Partial<BillingEntity>;

export function makeBilling(override: OverrideProps = {}): BillingEntity {
  return {
    id: Number(faker.datatype.bigInt()),
    domain: faker.internet.email(),
    amountOfDays: 14,
    createdAt: new Date(),
    updatedAt: null,
    ...override,
  } as BillingEntity;
}
