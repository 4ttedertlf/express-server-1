import app from "../app";
import request from "supertest";
import * as appPackage from "../../package.json";

describe("Test Handlers", function () {
  test("GET /api/status 200", async () => {
    const response = await request(app).get("/api/status");

    expect(response.statusCode).toEqual(200);
    const responseJson = JSON.parse(response.text);

    expect(Object.keys(responseJson)).toContain("version");
    expect(responseJson?.version).toEqual(appPackage.version);
  });
});
