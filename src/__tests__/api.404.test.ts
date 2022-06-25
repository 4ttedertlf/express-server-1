import app from "../app";
import request from "supertest";
import * as appPackage from "../../package.json";

describe("404", function () {
  test("GET /api/abc 404", async () => {
    const response = await request(app).get("/api/abc");

    expect(response.statusCode).toEqual(404);
  });
});
