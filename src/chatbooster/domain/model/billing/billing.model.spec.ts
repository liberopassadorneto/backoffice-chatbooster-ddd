import { faker } from '@faker-js/faker';
import { BillingModel } from './billing.model';

describe('BillingModel', () => {
  it('should create an instance', () => {
    const fakeDomain = faker.internet.domainName();
    const defaultTrialDays = 14;

    const billing = new BillingModel({
      domain: fakeDomain,
    });

    expect(billing).toBeTruthy();
    expect(billing.domain).toBe(fakeDomain);
    expect(billing.amountOfDays).toBe(defaultTrialDays);
  });
});
