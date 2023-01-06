import { randomInt } from 'node:crypto';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsInt } from 'class-validator';

export class BillingModel {
  @IsInt()
  @ApiProperty({ example: 1 })
  id: number;

  @IsEmail()
  @ApiProperty({ example: 'bmit.bitrix24.com.br' })
  domain: string;

  @IsInt()
  @ApiProperty({ example: 14 })
  amountOfDays: number;

  @IsDate()
  @ApiProperty({ example: '2023-01-03T21:09:55.000Z' })
  createdAt: Date;

  @IsDate()
  @ApiProperty({ example: '2023-01-03T21:09:55.000Z' })
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
