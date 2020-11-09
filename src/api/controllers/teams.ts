import * as express from "express";

import {
  getAllTeams,
  getTeamByName,
  createTeam,
  updateTeam,
} from "../../datasource";

const getExistingTeam = async (name: string) => getTeamByName(name);

export async function getAll(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const data = await getAllTeams();
  res.send(data);
}

export async function getByName(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const team = await getExistingTeam(req.params.team_name);

  if (team === undefined) {
    res.status(404).send({ message: "Team not found" });
  } else {
    res.send(team);
  }
}

export async function add(
  req: express.Request,
  res: express.Response
): Promise<void> {
  if (!req.body.name) {
    res.status(400).send({
      message: "name is required",
    });
  } else if (!req.body.img) {
    res.status(400).send({
      message: "img is required",
    });
  }

  const existingTeam = await getExistingTeam(req.body.name);

  if (existingTeam !== undefined)
    res.status(400).send({
      message: "This team already exists",
    });

  createTeam(req.body);
  res.status(201).send({ message: "Team created successfully" });
}

export async function update(
  req: express.Request,
  res: express.Response
): Promise<void> {
  if (!req.body.name) {
    res.status(400).send({
      message: "name is required",
    });
  } else if (!req.body.img) {
    res.status(400).send({
      message: "img is required",
    });
  }

  const existingTeam = await getExistingTeam(req.body.name);

  if (existingTeam === undefined)
    res.status(404).send({
      message: "Team not found",
    });

  updateTeam(req.body);
  res.status(204).send({ message: "Team updated successfully" });
}
