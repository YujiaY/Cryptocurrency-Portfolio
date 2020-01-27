import React from 'react';

const PurchasePanel = (props) => {
  const {
    topTenCoins,
    selectedCoinId,
    setSelectedCoinId,
    unitToBuy,
    setUnitToBuy,
    totalCostToBuy,
    setTotalCostToBuy,
    transactions,
    setTransactions,
  } = props;

  function calculateTotalPurchaseCost(e) {
    e.preventDefault();
    if (unitToBuy > 0) {
      const sum = topTenCoins[selectedCoinId].currentPrice * unitToBuy;
      setTotalCostToBuy(sum);
    } else {
      // eslint-disable-next-line no-undef
      alert('Please enter some number to BuyBuyBuy~~~');
    }
  }

  function handleBuyBuyBuy(e) {
    e.preventDefault();
    if (unitToBuy > 0) {
      // Add transaction record into History
      // eslint-disable-next-line max-len
      const index = transactions.findIndex((item) => item.name === topTenCoins[selectedCoinId].name);
      // Check whether have purchased this type of crypto
      if (index === -1) {
        const newTransactions = [
          ...transactions,
          {
            name: topTenCoins[selectedCoinId].name,
            id: topTenCoins[selectedCoinId].id,
            history: [{
              unit: unitToBuy,
              purchasePrice: topTenCoins[selectedCoinId].currentPrice,
            }],
          },
        ];
        setTransactions(newTransactions);
      } else {
        const newTransactionsPerType = { ...transactions[index] };
        newTransactionsPerType.history.push({
          unit: unitToBuy,
          purchasePrice: topTenCoins[selectedCoinId].currentPrice,
        });
        const newTransactions = [
          ...transactions.slice(0, index),
          newTransactionsPerType,
          ...transactions.slice(index + 1, transactions.length),
        ];
        setTransactions(newTransactions);
      }
    } else {
      // eslint-disable-next-line no-undef
      alert('Please enter some number to BuyBuyBuy~~~');
    }
  }

  return (
    <div className="alert alert-success">
      <form onSubmit={(e) => handleBuyBuyBuy(e)}>
        <p>Pick your favorite Coin:</p>
        <select value={selectedCoinId} onChange={(e) => setSelectedCoinId(e.target.value)}>
          {topTenCoins.map((coin, index) => (
            <option
              key={coin.name}
              value={index}
            >
              {coin.name}
            </option>
          ))}
        </select>
        <p>Unit to buy: </p>
        <input type="number" name="unit" onChange={(e) => setUnitToBuy(e.target.value)} />
        <button
          type="submit"
          className="alert alert-secondary"
          onClick={(e) => calculateTotalPurchaseCost(e)}
        >
          Calculate Total
        </button>
        <p>
          TotalCostToBuy:
          {totalCostToBuy}
        </p>
        <div>
          <button
            className="alert alert-danger"
            type="submit"
          >
            BuyBuyBuy
          </button>
        </div>
      </form>
    </div>
  );
};

export default PurchasePanel;
