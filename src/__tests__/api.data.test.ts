import { connectApp } from "../app";
import request from "supertest";
import { disconnect } from '../azure/mongo-database'; 

const routeBase = "/api/data";
const queryStringName = `collection`;
const queryStringValue = 'localdevjesttest';

describe("Data route", function () {

  test(`GET ${routeBase} 200`, async () => {
    const app = await connectApp();
    const response = await request(app)
    .get(`${routeBase}`)
    .query({ collection: queryStringValue });

    await app.locals.db.close();

    expect(response.statusCode).toEqual(200);
    const responseJson:any = JSON.parse(response.text);

    expect(Array.isArray(responseJson)).toBe(true);

  });
  test(`GET ${routeBase}/ 200`, async () => {
    const app = await connectApp();
    const response = await request(app)
    .get(`${routeBase}/`)
    .query({ collection: queryStringValue });

    await app.locals.db.close();

    expect(response.statusCode).toEqual(200);
    const responseJson:any = JSON.parse(response.text);

    expect(Array.isArray(responseJson)).toBe(true);

  });

  test(`GET ${routeBase}/abc 404`, async () => {
    const app = await connectApp();
    const response = await request(app)
    .get(`${routeBase}/abc`)
    .query({ collection: queryStringValue });

    await app.locals.db.close();

    expect(response.statusCode).toEqual(404);

  });
});
