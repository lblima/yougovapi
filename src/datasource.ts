import axios from "axios";
import NodeCache from "node-cache";

const youGovDataCache = new NodeCache();

interface Team {
  name: string;
  img: string;
}

const isEmpty = (data: NodeCache.Data) => {
  return Object.keys(data).length === 0 && data.constructor === Object;
};

const seedYouGovTeamsCache = async () => {
  const cachedData: NodeCache.Data = youGovDataCache.data;
  if (isEmpty(cachedData)) {
    const response = await axios.get(
      "https://gist.githubusercontent.com/joaofs/a6b80ce482de2f3846a00e72c0497a35/raw/07b62f4971dcdb11895a3138e6f0a91aeeea1036/football.json"
    );

    youGovDataCache.mset(
      response.data.map((o: { name: string }) => ({ key: o.name, val: o }))
    );
  }
};

const getAllData = async () => {
  await seedYouGovTeamsCache();
  return youGovDataCache.data;
};

const getDataByName = async (name: string): Promise<Team> => {
  await seedYouGovTeamsCache();
  return youGovDataCache.get(name) as Team;
};

const createTeam = async (team: Team) => {
  await seedYouGovTeamsCache();
  youGovDataCache.set(team.name, team);
};

const updateTeam = async (team: Team) => {
  await seedYouGovTeamsCache();
  const existingTeam = youGovDataCache.get(team.name) as Team;
  if (existingTeam) existingTeam.img = team.img;

  youGovDataCache.set(existingTeam.name, existingTeam);
};

export { getAllData, getDataByName, createTeam, updateTeam };
