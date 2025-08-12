import { describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../src/app";

describe.skip("GET /api/scan", async () => {
  it("should return 401 when no valid access token", async () => {
    const response = await request(app).get("/api/scan");

    expect(response.statusCode).toBe(401);
  });

  it("should return 200 and a list of targers", async () => {
    const uniqueUsername = `testuser-${Math.random()
      .toString(36)
      .substring(7)}`;
    const password = "test-password";

    await request(app)
      .post("/api/users")
      .send({ username: uniqueUsername, password: password });
    const loginResponse = await request(app)
      .post("/api/login")
      .send({ username: uniqueUsername, password: password });

    const response = await request(app)
      .get("/api/scan")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.targets.length).toBeGreaterThan(1);
  });
});
