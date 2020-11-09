import user from "../user";

describe("auth", () => {
  it("should resolve and validate userId for a given fake token", async () => {
    const response = await user.auth("yougovToken");
    expect(response).toEqual({ userId: "yougovUserId" });
  });

  it("should resolve with false for invalid token", async () => {
    const response = await user.auth("invalidToken");
    expect(response).toEqual({
      error: { type: "unauthorized", message: "Authentication Failed" },
    });
  });
});
