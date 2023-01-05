import { Module } from '@nestjs/common';
import { BillingControllerModule } from '@chatbooster/infra/http/controllers/billing/billing.controller.module';

@Module({
  imports: [BillingControllerModule],
})
export class ControllersModule {}
