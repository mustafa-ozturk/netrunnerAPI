import { describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../src/app";

describe("GET /api/inventory", async () => {
  it("should return 401 when no valid access token", async () => {
    const response = await request(app).get("/api/inventory");

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBeDefined();
  });

  it("should return 200 with the users inventory", async () => {
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

    const inventoryResponse = await request(app)
      .get("/api/inventory")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(inventoryResponse.statusCode).toBe(200);
    expect(inventoryResponse.body.items).toBeDefined();
  });
});
