import { describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../src/app";
import { ITEMS_MAP } from "../../src/items";
import { createItem } from "../../src/db/queries/items";

describe("POST /api/market", async () => {
  const uniqueUsername = `testuser-${Math.random().toString(36).substring(7)}`;
  const password = "test-password";
  await request(app)
    .post("/api/users")
    .send({ username: uniqueUsername, password: password });
  const loginResponse = await request(app)
    .post("/api/login")
    .send({ username: uniqueUsername, password: password });

  it("should return 401 when no valid access token", async () => {
    const response = await request(app).post("/api/market");

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBeDefined();
  });

  it("should return 400 when no proper body", async () => {
    const response = await request(app)
      .post("/api/market")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it("should return 201 with created market item", async () => {
    // give current user an item
    const item = ITEMS_MAP["encrypted_data_shard"];
    const dbItem = await createItem({
      itemName: item.name,
      itemType: item.type,
      description: item.description,
      quantity: 1,
      userId: loginResponse.body.id,
    });
    if (!dbItem) {
      throw new Error("couldn't create item");
    }

    // add item to the market
    const response = await request(app)
      .post("/api/market")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send({
        itemIds: [dbItem.id],
      });

    // check if it returns correct data
    expect(response.statusCode).toBe(201);
    expect(response.body.marketItems.length).toBe(1);
  });
});
