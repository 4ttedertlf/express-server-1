import { connectApp } from "../app";
import request from "supertest";
import * as appPackage from "../../package.json";

const routeBase = "/api/secret";
const queryStringName = `secret`;
const queryStringValue = 'test';

describe("Secret route", function () {
  test(`GET ${routeBase}?${queryStringName}=${queryStringValue} 200`, async () => {

    const app = await connectApp();

    const response = await request(app)
    .get(`${routeBase}`)
    .query({ secret: "test" });

    await app.locals.db.close();

    expect(response.statusCode).toEqual(200);
    expect(response.text).toEqual("abc");
  });
  test(`GET ${routeBase}/ 200`, async () => {

    const app = await connectApp();
    const response = await request(app)
    .get(`${routeBase}/`)
    .query({ secret: "test" });

    await app.locals.db.close();

    expect(response.statusCode).toEqual(200);
    expect(response.text).toEqual("abc");
  });
  test(`GET ${routeBase} - no secret 404`, async () => {

    const app = await connectApp();
    const response = await request(app).get(`${routeBase}`);

    await app.locals.db.close();

    expect(response.statusCode).toEqual(404);
    expect(JSON.parse(response.text).error).toEqual("no secret sent");

  });
});
