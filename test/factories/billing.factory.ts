import { faker } from '@faker-js/faker';
import { BillingModel } from '@chatbooster/billing/model/billing.model';
import { UpdateBillingDomainDto } from '@chatbooster/billing/controllers/dtos/update-billing-domain.dto';

type OverrideProps = Partial<BillingModel>;

export function makeBilling(override: OverrideProps = {}): BillingModel {
  return new BillingModel({
    domain: faker.internet.domainName(),
    ...override,
  });
}

export function makeUpdateBillingDomainDto(): UpdateBillingDomainDto {
  return {
    newDomain: faker.internet.domainName(),
  };
}
