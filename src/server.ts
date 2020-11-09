import express from "express";
import { Express } from "express-serve-static-core";
import * as bodyParser from "body-parser";

import {
  getAllData,
  getDataByName,
  createTeam,
  updateTeam,
} from "./datasource";

export async function createServer(): Promise<Express> {
  const app = express();
  app.use(bodyParser.json());

  app.get("/teams", async (req, res) => {
    const data = await getAllData();
    res.send(data);
  });

  app.get("/teams/:team_name", async (req, res) => {
    const team = await getDataByName(req.params.team_name);

    if (team === undefined) {
      res.status(404).send({ message: "Team not found" });
    } else {
      res.send(team);
    }
  });

  app.post("/teams", async (req, res) => {
    if (!req.body.name) {
      return res.status(400).send({
        message: "name is required",
      });
    } else if (!req.body.img) {
      return res.status(400).send({
        message: "img is required",
      });
    }

    const existingTeam = await getDataByName(req.body.name);

    if (existingTeam !== undefined)
      return res.status(400).send({
        message: "This team already exists",
      });

    createTeam(req.body);
    res.status(201).send({ message: "Team created successfully" });
  });

  app.put("/teams", async (req, res) => {
    if (!req.body.name) {
      return res.status(400).send({
        message: "name is required",
      });
    } else if (!req.body.img) {
      return res.status(400).send({
        message: "img is required",
      });
    }

    const existingTeam = await getDataByName(req.body.name);

    if (existingTeam === undefined)
      return res.status(404).send({
        message: "Team not found",
      });

    updateTeam(req.body);
    res.status(201).send({ message: "Team updated successfully" });
  });

  return app;
}
