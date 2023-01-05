import { randomInt } from 'node:crypto';

export class BillingModel {
  id: number;
  domain: string;
  amountOfDays: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<BillingModel>) {
    const defaultTrialDays = 14;

    this.id = this.id || randomInt(0, 2 ** 47); // 0 to 2^47
    this.amountOfDays = this.amountOfDays || defaultTrialDays;
    this.createdAt = this.createdAt || new Date();
    this.updatedAt = this.updatedAt || new Date();

    Object.assign(this, partial);
  }

  public get _id(): number {
    return this.id;
  }

  public get _domain(): string {
    return this.domain;
  }

  public set _domain(domain: string) {
    this.domain = domain;
  }

  public get _amountOfDays(): number {
    return this.amountOfDays;
  }

  public set _amountOfDays(amountOfDays: number) {
    this.amountOfDays = amountOfDays;
  }

  public get _createdAt(): Date {
    return this.createdAt;
  }

  public get _updatedAt(): Date {
    return this.updatedAt;
  }

  public updateDate(): void {
    this.updatedAt = new Date();
  }
}
