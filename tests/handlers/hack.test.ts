import { describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../src/app";
import {
  completeExpiredHacks,
  completeExpiredHacksById,
} from "../../src/db/queries/hacks";
import { TARGETS } from "../../src/gamedata";

describe("POST /api/hacks/:targetId", async () => {
  it("should return 401 with error message when no valid access token", async () => {
    const response = await request(app).post("/api/hacks/testTarget");

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBeDefined();
  });

  it("should create a hack with valid data", async () => {
    const uniqueUsername = `testuser-${Math.random()
      .toString(36)
      .substring(7)}`;
    const password = "test-password";
    const target = TARGETS.megacorp_financials;

    await request(app)
      .post("/api/users")
      .send({ username: uniqueUsername, password: password });
    const loginResponse = await request(app)
      .post("/api/login")
      .send({ username: uniqueUsername, password: password });

    const response = await request(app)
      .post(`/api/hacks/${target.id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.statusCode).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.createdAt).toBeDefined();
    expect(response.body.updatedAt).toBeDefined();
    expect(response.body.userId).toBe(loginResponse.body.id);
    expect(response.body.status).toBe("In Progress");
  });
});

describe("GET /api/hacks/:hackId", async () => {
  it("should return 401 with error message when no valid access token", async () => {
    const response = await request(app).get("/api/hacks/test");

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBeDefined();
  });
  it("should return 200 with correct data", async () => {
    const uniqueUsername = `testuser-${Math.random()
      .toString(36)
      .substring(7)}`;
    const password = "test-password";
    const target = TARGETS.security_contractor;

    await request(app)
      .post("/api/users")
      .send({ username: uniqueUsername, password: password });
    const loginResponse = await request(app)
      .post("/api/login")
      .send({ username: uniqueUsername, password: password });

    const postHackResponse = await request(app)
      .post(`/api/hacks/${target.id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const getHackResponse = await request(app)
      .get(`/api/hacks/${postHackResponse.body.id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(getHackResponse.statusCode).toBe(200);
    expect(getHackResponse.body.id).toBe(postHackResponse.body.id);
    expect(getHackResponse.body.userID).toBe(postHackResponse.body.userID);
    expect(getHackResponse.body.createdAt).toBe(
      postHackResponse.body.createdAt
    );
    expect(getHackResponse.body.updatedAt).toBe(
      postHackResponse.body.updatedAt
    );
    expect(getHackResponse.body.completesAt).toBe(
      postHackResponse.body.completesAt
    );
    expect(getHackResponse.body.status).toBe(postHackResponse.body.status);
  });
});

describe("GET /api/hacks/:hackdId/extract", async () => {
  it("should extract the hack", async () => {
    const uniqueUsername = `testuser-${Math.random()
      .toString(36)
      .substring(7)}`;
    const password = "test-password";
    const target = TARGETS.security_contractor;

    await request(app)
      .post("/api/users")
      .send({ username: uniqueUsername, password: password });
    const loginResponse = await request(app)
      .post("/api/login")
      .send({ username: uniqueUsername, password: password });

    const postHackResponse = await request(app)
      .post(`/api/hacks/${target.id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    // forcing early complete
    await completeExpiredHacksById(postHackResponse.body.id);

    // extract the hack
    await request(app)
      .get(`/api/hacks/${postHackResponse.body.id}/extract`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const getHackResponse = await request(app)
      .get(`/api/hacks/${postHackResponse.body.id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(getHackResponse.body.status).toBe("Extracted");
  });

  it("should return 200 with correct fields", async () => {
    const uniqueUsername = `testuser-${Math.random()
      .toString(36)
      .substring(7)}`;
    const password = "test-password";
    const target = TARGETS.security_contractor;

    await request(app)
      .post("/api/users")
      .send({ username: uniqueUsername, password: password });
    const loginResponse = await request(app)
      .post("/api/login")
      .send({ username: uniqueUsername, password: password });

    const postHackResponse = await request(app)
      .post(`/api/hacks/${target.id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    // forcing early complete
    await completeExpiredHacksById(postHackResponse.body.id);

    // extract the hack
    const extractResponse = await request(app)
      .get(`/api/hacks/${postHackResponse.body.id}/extract`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(extractResponse.statusCode).toBe(200);
    expect(extractResponse.body.message).toBeDefined();
    expect(extractResponse.body.exp).toBeDefined();
    expect(extractResponse.body.items).toBeDefined();
    expect(extractResponse.body.eurodollars).toBeDefined();
  });
});
