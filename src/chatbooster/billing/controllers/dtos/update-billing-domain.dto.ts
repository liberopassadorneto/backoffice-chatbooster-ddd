import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBillingDomainDto {
  @ApiProperty({
    example: 'example@bitrix24.com.br',
  })
  @IsEmail()
  @IsNotEmpty()
  readonly newDomain: string;
}
