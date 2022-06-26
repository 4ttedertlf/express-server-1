import { connectApp } from "../app";
import request from "supertest";
import * as appPackage from "../../package.json";

const routeBase = "/api";

describe("Api route", function () {
  test(`GET ${routeBase} 404`, async () => {

    const app = await connectApp();
    const response = await request(app).get(routeBase);
    await app.locals.db.close();

    expect(response.statusCode).toEqual(404);
  });
  test(`GET ${routeBase}/ 404`, async () => {

    const app = await connectApp();
    const response = await request(app).get(`${routeBase}/`);
    await app.locals.db.close();

    expect(response.statusCode).toEqual(404);
  });
  test(`GET ${routeBase}/abc 404`, async () => {
    const app = await connectApp();
    const response = await request(app).get(`${routeBase}/abc`);
    await app.locals.db.close();

    expect(response.statusCode).toEqual(404);

  });
});
