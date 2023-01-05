import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsEmail, IsDate } from 'class-validator';

export class BillingDomain {
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
  @ApiProperty({ example: '2022-02-15' })
  createdAt: Date;

  @IsDate()
  @ApiProperty({ example: '2022-06-06' })
  updatedAt: Date;
}
