import { describe, expect, it } from "vitest";
import { createHack } from "../../../src/db/queries/hacks";
import request from "supertest";
import { app } from "../../../src/app";

import { completeExpiredHacks } from "../../../src/db/queries/hacks";

describe("completeExpiredHacks", async () => {
  const uniqueUsername = `testuser-${Math.random().toString(36).substring(7)}`;
  const password = "test-password";
  const response = await request(app)
    .post("/api/users")
    .send({ username: uniqueUsername, password: password });
  const user = response.body;

  it("should complete hacks that have passed their completion time", async () => {
    const hack = await createHack(user.id, 0);

    const completed = await completeExpiredHacks();

    expect(completed).toHaveLength(1);
    expect(completed[0].id).toBe(hack!.id);
    expect(completed[0].status).toBe("Completed");
  });

  it("should not complete hacks that have not passed their completion time", async () => {
    await createHack(user.id, 100);

    const completed = await completeExpiredHacks();

    expect(completed).toHaveLength(0);
  });
});
