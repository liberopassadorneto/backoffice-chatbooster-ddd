import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingEntity } from './domain/billing.entity';
import { findBillingProvider } from './providers/find-billing.provider';

@Module({
  imports: [TypeOrmModule.forFeature([BillingEntity])],
  controllers: [...findBillingProvider.controllers],
  providers: [...findBillingProvider.providers],
  exports: [...findBillingProvider.exports],
})
export class BillingModule {}
