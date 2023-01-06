import { Module } from '@nestjs/common';
import { BillingControllersModule } from './controllers/billling.controllers.module';

@Module({
  imports: [BillingControllersModule],
})
export class BillingModule {}
