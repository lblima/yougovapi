import * as express from "express";
import { writeJsonResponse } from "../../createResponse";
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
  const teams = await getAllTeams();
  writeJsonResponse(res, 200, teams);
}

export async function getByName(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const team = await getExistingTeam(req.params.team_name);

  if (team === undefined) {
    writeJsonResponse(res, 404, { message: "Team not found" });
  } else {
    writeJsonResponse(res, 200, team);
  }
}

export async function add(
  req: express.Request,
  res: express.Response
): Promise<void> {
  if (!req.body.name) {
    writeJsonResponse(res, 400, { message: "name is required" });
  } else if (!req.body.img) {
    writeJsonResponse(res, 400, { message: "img is required" });
  }

  const existingTeam = await getExistingTeam(req.body.name);

  if (existingTeam !== undefined) {
    writeJsonResponse(res, 400, { message: "This team already exists" });
  } else {
    createTeam(req.body);
    writeJsonResponse(res, 201, { message: "Team created successfully" });
  }
}

export async function update(
  req: express.Request,
  res: express.Response
): Promise<void> {
  if (!req.body.name) {
    writeJsonResponse(res, 400, { message: "name is required" });
  } else if (!req.body.img) {
    writeJsonResponse(res, 400, { message: "img is required" });
  }

  const existingTeam = await getExistingTeam(req.body.name);

  if (existingTeam === undefined) {
    writeJsonResponse(res, 404, { message: "Team not found" });
  } else {
    updateTeam(req.body);
    writeJsonResponse(res, 204, { message: "Team updated successfully" });
  }
}
