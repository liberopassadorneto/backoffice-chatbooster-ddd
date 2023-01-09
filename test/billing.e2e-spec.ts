import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { BillingModule } from '@chatbooster/billing/billing.module';
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingEntity } from '@chatbooster/billing/typeorm/entities/billing.entity';

describe('Billing (e2e)', () => {
  let app: INestApplication;
  let localRepository: Repository<BillingEntity>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        BillingModule,
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 24001,
          username: 'root',
          password: 'root',
          database: 'chatbooster',
          entities: [BillingEntity],
          synchronize: true,
        }),
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    localRepository = module.get('BillingEntityRepository');
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(async () => {
    await localRepository.query(`DELETE FROM billing;`);
  });

  describe('GET /billing/:domain', () => {
    it('should find one billing by domain', async () => {
      const domain = faker.internet.domainName();

      await localRepository.save({
        domain,
        amountOfDays: 14,
      });

      const { status, body } = await request(app.getHttpServer()).get(
        `/billing/${domain}`,
      );

      expect(status).toBe(200);
      expect(body.domain).toEqual(domain);
      expect(body.amountOfDays).toEqual(14);
    });
  });

  describe('PATCH /billing/:domain/update', () => {
    it('should update a billing domain', async () => {
      const currentDomain = faker.internet.domainName();

      await localRepository.save({
        domain: currentDomain,
        amountOfDays: 14,
      });

      const newDomain = faker.internet.domainName();

      const { status } = await request(app.getHttpServer())
        .patch(`/billing/${currentDomain}/update`)
        .send({
          newDomain,
        });

      expect(status).toBe(200);

      const result = await localRepository.findOneBy({ domain: newDomain });

      expect(result?.domain).toEqual(newDomain);
    });
  });
});
