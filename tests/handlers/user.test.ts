import { describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../src/app.js";

describe("POST /api/users", () => {
  it("should create user with valid data", async () => {
    const uniqueUsername = `testuser-${Math.random()
      .toString(36)
      .substring(7)}`;
    const response = await request(app)
      .post("/api/users")
      .send({ username: uniqueUsername, password: "testpw" });

    expect(response.statusCode).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.username).toBe(uniqueUsername);
    expect(response.body.createdAt).toBeDefined();
    expect(response.body.updatedAt).toBeDefined();
  });

  it("should return 400 with error message when username is missing", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({ password: "testpw" });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toBe("Missing required params: username.");
  });

  it("should return 400 with error message when password is missing", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({ username: "test" });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toBe("Missing required params: password.");
  });

  it("should return 400 with error message when username and password is missing", async () => {
    const response = await request(app).post("/api/users");

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toBe(
      "Missing required params: username, password."
    );
  });

  it("should return 409 with error message when username already exists", async () => {
    const uniqueUsername = `testuser-${Math.random()
      .toString(36)
      .substring(7)}`;
    await request(app)
      .post("/api/users")
      .send({ username: uniqueUsername, password: "testpw" });
    const response = await request(app)
      .post("/api/users")
      .send({ username: uniqueUsername, password: "testpw" });

    expect(response.statusCode).toBe(409);
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toBe("Username already exists.");
  });

  it("should return 400 when username is empty string", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({ username: "", password: "testpw" });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toBe("Missing required params: username.");
  });
});

// TODO: cleanup test users
