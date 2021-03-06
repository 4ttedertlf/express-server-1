import { connectApp } from "../app";
import request from "supertest";
import * as appPackage from "../../package.json";

const routeBase = "/api/status";

describe("Status route", function () {
  test(`GET ${routeBase} 200`, async () => {
    const app = await connectApp();
    const response = await request(app).get(routeBase);
    await app.locals.db.close();

    expect(response.statusCode).toEqual(200);
    const responseJson = JSON.parse(response.text);

    expect(Object.keys(responseJson)).toContain("version");
    expect(responseJson?.version).toEqual(appPackage.version);
  });
  test(`GET ${routeBase}/ 200`, async () => {
    const app = await connectApp();
    const response = await request(app).get(`${routeBase}/`);
    await app.locals.db.close();

    expect(response.statusCode).toEqual(200);
    const responseJson = JSON.parse(response.text);

    expect(Object.keys(responseJson)).toContain("version");
    expect(responseJson?.version).toEqual(appPackage.version);
  });
  test(`GET ${routeBase}/abc 404`, async () => {
    const app = await connectApp();
    const response = await request(app).get(`${routeBase}/abc`);
    await app.locals.db.close();

    expect(response.statusCode).toEqual(404);
  });
});
