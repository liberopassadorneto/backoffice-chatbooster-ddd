import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

describe('FindByDomainController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => app.close());

  describe('FindByDomain', () => {
    const fakeDomain = faker.internet.email();

    it('/:domain (GET)', async () => {
      const response = await request(app.getHttpServer()).get(
        `/billing/${fakeDomain}`,
      );

      expect(response.status).toBe(404);
    });
  });
});
