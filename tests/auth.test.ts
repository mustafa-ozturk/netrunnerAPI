import { describe, it, expect, beforeAll } from "vitest";
import { checkPasswordHash, hashPassword } from "./auth";

describe("hashPassword", () => {
  it("should return a hash string different from the password", async () => {
    const pw = "testpw";
    const hash = await hashPassword(pw);
    expect(hash).not.toBe(pw);
  });

  it("should return a long hash string", async () => {
    const pw = "testpw";
    const hash = await hashPassword(pw);
    expect(hash.length).toBeGreaterThan(0);
  });
});

describe("checkPasswordHash", () => {
  it("should return false when password and hash don't match", async () => {
    const pw = "testpw";
    const hash = "test-hash";
    const matched = await checkPasswordHash(pw, hash);
    expect(matched).toBe(false);
  });

  it("should return true when password and hash match", async () => {
    const pw = "testpw";
    const hash = await hashPassword(pw);
    const matched = await checkPasswordHash(pw, hash);
    expect(matched).toBe(true);
  });
});
