import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

describe('Billing (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => app.close());

  it('Find one billing by domain [GET /billing/:domain]', async () => {
    const fakeDomain = faker.internet.email();

    const response = await request(app.getHttpServer()).get(
      `/billing/${fakeDomain}`,
    );

    expect(response.status).toBe(404);
  });

  it('Update billing domain [PATCH /billing/:domain/update]', async () => {
    const fakeCurrentDomain = faker.internet.email();
    const fakeNewDomain = faker.internet.email();

    const response = await request(app.getHttpServer())
      .patch(`/billing/${fakeCurrentDomain}/update`)
      .send({
        newDomain: fakeNewDomain,
      });

    expect(response.status).toBe(404);
  });
});
