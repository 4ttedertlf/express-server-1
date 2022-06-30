import { connectApp } from "../app";
import request from "supertest";
import * as appPackage from "../../package.json";

const routeBase = "/api/storage";

describe("Storage route", function () {
  test(`GET ${routeBase} 200`, async () => {
    const app = await connectApp();
    const testContainerName = "jestcontainername";
    const response = await request(app).get(routeBase).query({ container: testContainerName });
    await app.locals.db.close();

    expect(response.statusCode).toEqual(200);
    const responseJson = JSON.parse(response.text);
    expect(Array.isArray(responseJson)).toBe(true);
    
  });
  test(`GET ${routeBase}/ 200`, async () => {
    const app = await connectApp();
    const testContainerName = "jestcontainername";
    const response = await request(app).get(`${routeBase}/`).query({ container: testContainerName });
    await app.locals.db.close();

    expect(response.statusCode).toEqual(200);
    const responseJson = JSON.parse(response.text);
    expect(Array.isArray(responseJson)).toBe(true);

  });
  test(`GET ${routeBase}/abc 404`, async () => {
    const app = await connectApp();
    const response = await request(app).get(`${routeBase}/abc`);
    await app.locals.db.close();

    expect(response.statusCode).toEqual(404);
  });
});
