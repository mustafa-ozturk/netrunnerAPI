import { describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../src/app";

describe("GET /api/stats", async () => {
  it("should return 401 when no valid access token", async () => {
    const response = await request(app).get("/api/stats");

    expect(response.statusCode).toBe(401);
  });

  it("should return 200 with correct fields", async () => {
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
      .get("/api/stats")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBeDefined();
    expect(response.body.createdAt).toBeDefined();
    expect(response.body.updatedAt).toBeDefined();
    expect(response.body.experience).toBeDefined();
    expect(response.body.level).toBeDefined();
    expect(response.body.eurodollars).toBeDefined();
    expect(response.body.userId).toBe(loginResponse.body.id);
  });
});
