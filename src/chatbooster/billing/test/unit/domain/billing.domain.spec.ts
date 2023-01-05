import { BillingDomain } from '@chatbooster/billing/domain/billing.domain';

describe('Billing Domain', () => {
  it('should create a new instance', () => {
    const billing = new BillingDomain();

    expect(billing).toBeInstanceOf(BillingDomain);
    expect(billing).toBeTruthy();
  });
});
