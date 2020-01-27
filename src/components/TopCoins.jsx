import React, {useEffect, useState} from 'react';
import axios from "axios";

const TopCoins = props => {

  const {topTenCoins, setTopTenCoins} = props;
  const [updateTime, setUpdateTime] = useState('N/A');

  async function fetchCryptoAPI() {
    console.log('Fetching Crypto API...');

    // Below did not work very well since too many request in a shot time will let the app get banned
    // const res = await axios.get('https://api.coinmarketcap.com/v1/ticker/?convert=aud');

    // Use local proxy to fetch data since coinmarketcap.com bans Front End request using Node.js
    const res = await axios.get('http://localhost:1368/api');

    let newTopTenCoins = [];
    res.data.data.forEach(item => {
      let name = item.name;
      let id = item.id;
      let currentPrice = item.quote.AUD.price;
      newTopTenCoins.push({name, id, currentPrice});
    });
    setTopTenCoins(newTopTenCoins);
    setUpdateTime(new Date(res.data.data[0].last_updated).toLocaleString());
  }

  useEffect(() => {
    fetchCryptoAPI()
      .then(() => console.log('Latest API call responsed.'))
  }, []);

  return (
    <div className="alert alert-success">
      <h3>Top Ten Coins: (Last updated at: {updateTime})</h3>
      <button
        className='primary alert-primary'
        onClick={fetchCryptoAPI}>
        Update coins and prices
      </button>
      <div>
        <table className="text-center table table-sm table-dark table-striped table-bordered table-hover">
          <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">ID</th>
            <th scope="col">Current Price</th>
          </tr>
          </thead>
          <tbody>
          {topTenCoins.map((coin, index) =>
            <tr key={index}>
              <th scope="row">{topTenCoins[index].name}</th>
              <td>{topTenCoins[index].id}</td>
              <td>{topTenCoins[index].currentPrice || 'Not available. Please update.'}</td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  )
};

export default TopCoins;
