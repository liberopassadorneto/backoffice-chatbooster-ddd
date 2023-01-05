import { BillingEntity } from '../entities/billing.entity';
import { BillingModel } from '../model/billing.model';

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
