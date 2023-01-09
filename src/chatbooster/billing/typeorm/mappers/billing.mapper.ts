import { BillingModel } from '@chatbooster/billing/model/billing.model';
import { BillingEntity } from '../entities/billing.entity';

export class TypeOrmBillingMapper {
  static toModel(billing: BillingEntity): BillingModel {
    return new BillingModel({
      id: billing.id,
      domain: billing.domain,
      amountOfDays: billing.amountOfDays,
      createdAt: billing.createdAt,
      updatedAt: billing.updatedAt,
    });
  }

  static toEntity(billing: BillingModel): BillingEntity {
    return {
      id: billing.id,
      domain: billing.domain,
      amountOfDays: billing.amountOfDays,
      createdAt: billing.createdAt,
      updatedAt: billing.updatedAt,
    };
  }
}
