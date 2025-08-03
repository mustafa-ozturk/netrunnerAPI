import { describe, it, expect, beforeAll } from "vitest";
import {
  checkPasswordHash,
  hashPassword,
  makeJWT,
  validateJWT,
} from "../src/auth.js";
import { UnAuthorizedError } from "../src/error.js";

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

describe("makeJWT", () => {
  it("should return a string with length > 0", async () => {
    const jwt = makeJWT("test-userId", 60, "test-secret");
    expect(jwt.length).greaterThan(0);
  });
});

describe("validateJWT", () => {
  it("should return subject of JWT", async () => {
    const subject = "test-subject";
    const secret = "test-secret";

    const token = makeJWT(subject, 3600, secret);
    const decodedSubject = validateJWT(token, secret);

    expect(decodedSubject).toBe(subject);
  });

  it("should throw an UnAuthorizedError when token is invalid", async () => {
    const secret = "test-secret";

    expect(() => validateJWT("invalid-token-string", secret)).toThrow(
      UnAuthorizedError
    );
  });

  it("should throw an UnAuthorizedError when the token is signed with a wrong secret", () => {
    const subject = "test-subject";
    const secret = "test-secret";

    const token = makeJWT(subject, 3600, secret);

    expect(() => validateJWT(token, "wrong-secret")).toThrow(UnAuthorizedError);
  });

  it("should throw there's no subject", async () => {
    const subject = "";
    const secret = "test-secret";

    const token = makeJWT(subject, 3600, secret);

    expect(() => validateJWT(token, secret)).toThrow(UnAuthorizedError);
  });
});
