import request from "supertest";
import { Express } from "express-serve-static-core";

import { createServer } from "@yougov/server";

let server: Express;
const TOKEN = "yougovToken";

beforeAll(async () => {
  server = await createServer();
});

describe("GET /teams", () => {
  it("should return 200 and valid response if request param list is empty", async (done) => {
    request(server)
      .get(`/api/v1/teams`)
      .set("Authorization", `Bearer ${TOKEN}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).not.toBeNull();
        done();
      });
  });

  it("should return 200 and valid response if name param is set", async (done) => {
    request(server)
      .get(`/api/v1/teams/Arsenal`)
      .set("Authorization", `Bearer ${TOKEN}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toMatchObject({
          name: "Arsenal",
          img:
            "https://s3-eu-west-1.amazonaws.com/inconbucket/images/entities/original/632.jpg",
        });
        done();
      });
  });

  it("should return 404 and valid error response if name param is invalid", async (done) => {
    request(server)
      .get(`/api/v1/teams/Arsenalxxx`)
      .set("Authorization", `Bearer ${TOKEN}`)
      .expect("Content-Type", /json/)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toMatchObject({
          message: "Team not found",
        });
        done();
      });
  });

  it("should return 401 and valid error response to invalid authorization token", async (done) => {
    request(server)
      .get(`/api/v1/teams`)
      .set("Authorization", "Bearer invalidFakeToken")
      .expect("Content-Type", /json/)
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toMatchObject({
          error: { type: "unauthorized", message: "Authentication Failed" },
        });
        done();
      });
  });
});
