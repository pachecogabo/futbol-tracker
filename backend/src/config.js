require('dotenv').config();

module.exports = {
  apiKey: process.env.API_KEY,
  teamId: process.env.TEAM_ID,
  leagueId: process.env.LEAGUE_ID,
  baseUrl: process.env.BASE_URL,
  port: process.env.PORT || 3000,
  redisUrl: process.env.REDIS_URL,
  cacheTTL: parseInt(process.env.CACHE_TTL, 10)
};
