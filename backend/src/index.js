const express = require('express');
const { port } = require('./config');
const apiRoutes = require('./routes/api');

const app = express();

app.use('/api', apiRoutes);

app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
