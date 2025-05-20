const axios = require('axios');
const { apiKey, baseUrl } = require('../config');

const headers = {
  'x-rapidapi-host': new URL(baseUrl).host,
  'x-rapidapi-key': apiKey
};

const api = axios.create({ baseURL: baseUrl, headers });

const getFixture = async (teamId) => {
  const today = new Date().toISOString().split('T')[0];
  const res = await api.get('/fixtures', {
    params: { team: teamId, date: today }
  });
  return res.data.response;
};

const getNextFixture = async (teamId) => {
  const res = await api.get('/fixtures', {
    params: { team: teamId, next: 1 }
  });
  return res.data.response[0];
};

const getStandings = async (leagueId, season) => {
  const res = await api.get('/standings', {
    params: { league: leagueId, season }
  });
  return res.data.response[0].league.standings[0];
};

module.exports = {
  getFixture,
  getNextFixture,
  getStandings
};
