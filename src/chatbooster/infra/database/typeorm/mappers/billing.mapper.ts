import { BillingModel } from '@chatbooster/domain/model/billing/billing.model';
import { BillingEntity } from '@chatbooster/infra/database/typeorm/entities/billing.entity';

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