import { Replace } from '@helpers/Replace';
import { randomInt } from 'node:crypto';

export interface BillingModelProps {
  id: number;
  domain: string;
  amountOfDays: number;
  createdAt: Date;
  updatedAt: Date;
}

export class BillingModel {
  private readonly props: BillingModelProps;

  constructor(
    props: Replace<
      BillingModelProps,
      { id?: number; amountOfDays?: number; createdAt?: Date; updatedAt?: Date }
    >,
  ) {
    const defaultTrialDays = 14;

    this.props = {
      id: props.id || randomInt(0, 2 ** 47), // 0 to 2^47
      domain: props.domain,
      amountOfDays: props.amountOfDays || defaultTrialDays,
      createdAt: props.createdAt || new Date(),
      updatedAt: props.updatedAt || new Date(),
    };
  }

  public get id(): number {
    return this.props.id;
  }

  public get domain(): string {
    return this.props.domain;
  }

  public set domain(domain: string) {
    this.props.domain = domain;
  }

  public get amountOfDays(): number {
    return this.props.amountOfDays;
  }

  public set amountOfDays(amountOfDays: number) {
    this.props.amountOfDays = amountOfDays;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public updateDate(): void {
    this.props.updatedAt = new Date();
  }
}
