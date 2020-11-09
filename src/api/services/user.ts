export type AuthResponse = ErrorResponse | { userId: string };
export type ErrorResponse = { error: { type: string; message: string } };

function auth(bearerToken: string): Promise<AuthResponse> {
  return new Promise((resolve, reject) => {
    const token = bearerToken.replace("Bearer ", "");
    if (token === "yougovToken") {
      resolve({ userId: "yougovUserId" });
      return;
    }

    resolve({
      error: { type: "unauthorized", message: "Authentication Failed" },
    });
  });
}

export default { auth };
