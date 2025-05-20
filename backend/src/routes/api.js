const express = require('express');
const router = express.Router();
const { teamId, leagueId } = require('../config');
const { getCached, setCached } = require('../services/cache');
const { getFixture, getNextFixture, getStandings } = require('../services/footballApi');

router.get('/fixture', async (req, res, next) => {
  try {
    const cacheKey = `fixture:${teamId}`;
    const cached = await getCached(cacheKey);
    if (cached) return res.json(cached);

    const fixtures = await getFixture(teamId);
    const live = fixtures.find(f => f.fixture.status.short === '1H' || f.fixture.status.short === '2H');

    let result;
    if (live) {
      result = {
        status: 'live',
        match: live
      };
      await setCached(cacheKey, result, 600); // 10 min TTL for live
    } else {
      const next = await getNextFixture(teamId);
      result = {
        status: 'next',
        match: next
      };
      await setCached(cacheKey, result);
    }

    res.json(result);
  } catch (err) {
    console.error('Error in /fixture:', err.message);
    next(err);
  }
});

router.get('/standings', async (req, res, next) => {
  try {
    const cacheKey = `standings:${leagueId}`;
    const cached = await getCached(cacheKey);
    if (cached) return res.json(cached);

    const currentYear = new Date().getFullYear();
    const data = await getStandings(leagueId, currentYear);
    await setCached(cacheKey, data);
    res.json(data);
  } catch (err) {
    console.error('Error in /standings:', err.message);
    next(err);
  }
});

module.exports = router;
