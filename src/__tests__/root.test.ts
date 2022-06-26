import { connectApp } from "../app";
import request from "supertest";
import * as appPackage from "../../package.json";


const routeBase = "/";

describe("Root route", function () {
  test("GET / 200", async () => {

    const app = await connectApp();
    const response = await request(app).get(routeBase);
    await app.locals.db.close();

    expect(response.statusCode).toEqual(200);
  });
  test("GET / 200", async () => {

    const app = await connectApp();
    const response = await request(app).get("");
    await app.locals.db.close();

    expect(response.statusCode).toEqual(200);
  });
});
