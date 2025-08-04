import { expect, describe, it } from "vitest";
import request from "supertest";
import { app } from "../../src/app";

describe("POST /api/login", () => {
  it("should return 400 with error message when username and password is missing", async () => {
    const response = await request(app).post("/api/login");

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toBe(
      "Missing required params: username, password."
    );
  });

  it("should return 401 with error message when username doesn't exist", async () => {
    const username = `test-username-random-${Math.random()}`;
    const password = "test-password";

    const response = await request(app).post("/api/login").send({
      username: username,
      password,
    });

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toBe("Incorrect username or password.");
  });

  it("should return 401 with error message when password is not valid", async () => {
    const uniqueUsername = `testuser-${Math.random()
      .toString(36)
      .substring(7)}`;
    const password = "test-password";

    await request(app)
      .post("/api/users")
      .send({ username: uniqueUsername, password: password });
    const response = await request(app).post("/api/login").send({
      username: uniqueUsername,
      password: "wrong-password",
    });

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toBe("Incorrect username or password.");
  });

  it("should return 200 with the correct response on success", async () => {
    const uniqueUsername = `testuser-${Math.random()
      .toString(36)
      .substring(7)}`;
    const password = "test-password";

    await request(app)
      .post("/api/users")
      .send({ username: uniqueUsername, password: password });
    const response = await request(app)
      .post("/api/login")
      .send({ username: uniqueUsername, password: password });

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBeDefined();
    expect(response.body.username).toBe(uniqueUsername);
    expect(response.body.createdAt).toBeDefined();
    expect(response.body.updatedAt).toBeDefined();
    expect(response.body.token).toBeDefined();
    expect(response.body.refreshToken).toBeDefined();
  });
});

// TODO: clean up test users
