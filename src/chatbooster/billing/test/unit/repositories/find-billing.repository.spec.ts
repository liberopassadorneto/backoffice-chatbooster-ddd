import { BillingEntity } from '@chatbooster/billing/domain/billing.entity';
import { FindBillingRepository } from '@chatbooster/billing/repositories/find-billing.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { makeBilling } from '../../factories/billing.factory';

const billingMock = makeBilling();

describe('FindBillingRepository', () => {
  let repository: FindBillingRepository;
  let repositoryMock: Repository<BillingEntity>;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        FindBillingRepository,
        {
          provide: getRepositoryToken(BillingEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    repository = app.get<FindBillingRepository>(FindBillingRepository);
    repositoryMock = app.get<Repository<BillingEntity>>(
      getRepositoryToken(BillingEntity),
    );
  });

  describe('findByDomain', () => {
    it('should find billing by domain', async () => {
      jest.spyOn(repositoryMock, 'findOneBy').mockResolvedValue(billingMock);

      const billing = await repository.findByDomain(billingMock.domain);

      expect(billing).toEqual(billingMock);
      expect(repositoryMock.findOneBy).toHaveBeenCalledWith({
        domain: billingMock.domain,
      });
    });

    it('should return null if billing not found', async () => {
      jest.spyOn(repositoryMock, 'findOneBy').mockResolvedValue(null);

      const billing = await repository.findByDomain(billingMock.domain);

      expect(billing).toBeNull();
      expect(repositoryMock.findOneBy).toHaveBeenCalledWith({
        domain: billingMock.domain,
      });
    });
  });
});
