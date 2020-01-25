const rp = require('request-promise');

const requestOptions = (url, qsObj) => ({
  method: 'GET',
  uri: url,
  qs: qsObj,
  headers: {
    'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY
  },
  json: true,
  gzip: true
})

exports.getLatestPrice = async (req, res) => {
  const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
  const qsObj =  {
    'start': '1',
    'limit': '10',
    'convert': 'AUD'
  };
  rp(requestOptions(url, qsObj)).then(response => {
    console.log('Latest API call responsed.');
    return res.status(200).json({
      success: true,
      data: response.data
    });
  }).catch((err) => {
    console.log('Latest API call error:', err.message);
  });
};

exports.updateValuePrice = async (req, res) => {
  if (!req.query.idArr.length === 0) {
    return res.status(200).json({
      success: true,
      data: []
    })
  };

  const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest';
  const qsObj = {
    'id': req.query.idArr,
    'convert': 'AUD'
  };
  rp(requestOptions(url, qsObj)).then(response => {
    console.log('Update API call responsed.');
    return res.status(200).json({
      success: true,
      data: response.data
    });
  }).catch((err) => {
    console.log('Update API call error:', err.message);
  });
}
