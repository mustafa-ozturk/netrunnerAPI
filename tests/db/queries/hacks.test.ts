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
    const myCompletedHack = completed.find((h) => h.id === hack!.id);

    expect(myCompletedHack).toBeDefined();
    expect(myCompletedHack!.status).toBe("Completed");
  });

  it("should not complete hacks that have not passed their completion time", async () => {
    const hack = await createHack(user.id, 100);

    const completed = await completeExpiredHacks();
    const myCompletedHack = completed.find((h) => h.id === hack!.id);

    expect(myCompletedHack).not.toBeDefined();
  });
});
