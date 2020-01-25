const express = require('express');
const cors = require('cors');
const rp = require('request-promise');
require('dotenv').config();

const { getLatestPrice, updateValuePrice } = require('./apiHandler');

const app = express();

app.use(cors());

app.get('/api', getLatestPrice);

app.get('/current', updateValuePrice);

const port = process.env.PORT || 1368;
app.listen(port, () => {
  console.log('Listening on port ',port)
})
