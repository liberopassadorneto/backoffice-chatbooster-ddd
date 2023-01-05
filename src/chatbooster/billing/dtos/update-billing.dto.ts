import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsOptional } from 'class-validator';

export class UpdateBillingDto {
  @IsEmail()
  @IsOptional()
  @ApiProperty({ example: 'bmit.bitrix24.com.br' })
  domain?: string;

  @IsInt()
  @IsOptional()
  @ApiProperty({ example: 14 })
  amountOfDays?: number;
}
