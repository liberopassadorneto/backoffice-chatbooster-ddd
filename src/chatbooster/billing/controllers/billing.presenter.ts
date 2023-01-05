import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsInt } from 'class-validator';
import { BillingModel } from '../model/billing.model';

export class BillingPresenter extends BillingModel {
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

  constructor(billing: BillingModel) {
    super(billing);
    this.id = billing.id;
    this.domain = billing.domain;
    this.amountOfDays = billing.amountOfDays;
    this.createdAt = billing.createdAt;
    this.updatedAt = billing.updatedAt;
  }

  static toPresenter(billing: BillingModel): BillingPresenter {
    return new BillingPresenter(billing);
  }
}
