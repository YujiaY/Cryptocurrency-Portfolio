const express = require('express');
const cors = require('cors');
const rp = require('request-promise');

require('dotenv').config();

const app = express();

app.use(cors());

app.get('/api', (req, res) => {

  const requestOptions = {
    method: 'GET',
    uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    qs: {
      'start': '1',
      'limit': '10',
      'convert': 'AUD'
    },
    headers: {
      'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY
    },
    json: true,
    gzip: true
  };

  rp(requestOptions).then(response => {

    console.log('Latest API call responsed.');
    return res.status(200).json({
      success: true,
      data: response.data
    });
  }).catch((err) => {
    console.log('Latest API call error:', err.message);
  });

});

app.get('/current', (req, res) => {
  const requestOptions = {
    method: 'GET',
    uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
    qs: {
      'id': req.query.idArr,
      'convert': 'AUD'
    },
    headers: {
      'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY
    },
    json: true,
    gzip: true
  };

  rp(requestOptions).then(response => {

    console.log('Update API call responsed.');
    return res.status(200).json({
      success: true,
      data: response.data
    });
  }).catch((err) => {
    console.log('Update API call error:', err.message);
  });
})


const port = process.env.PORT || 1368
app.listen(port, () => {
  console.log('Listening on port ',port)
})
