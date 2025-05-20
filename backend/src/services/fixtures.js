const axios = require('axios');
const API_URL = process.env.API_URL;

async function getFixtures() {
  try {
    const response = await axios.get(`${API_URL}/fixtures`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from API:', error.message);
    throw error;
  }
}

module.exports = {
  getFixtures,
};
