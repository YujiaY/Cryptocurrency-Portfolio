import React, { useState } from 'react';

function MoneyTime() {

  // Set dummy data for dev and test
  // TODO: Use MongoDB Atlas as data source.
  const [transactions, setTransactions] = useState({
    Bitcoin: [
      {
        id: 1,
        unit: 1,
        purchasePrice: 13000
      },
      {
        id: 2,
        unit: 3,
        purchasePrice: 12000
      },
      {
        id: 3,
        unit: 5,
        purchasePrice: 11000
      }
    ],
    Ethereum: [
      {
        id: 4,
        unit: 1,
        purchasePrice: 800
      },
      {
        id: 5,
        unit: 2,
        purchasePrice: 600
      },
      {
        id: 6,
        unit: 3,
        purchasePrice: 500
      }
    ]
  });

  function calTotalUnitPerType (type)  {
    let sum = 0;
    transactions[type].forEach(tran => {
      sum += tran.unit;
    });
    return sum;
  };

  function calTotalPaidPerType (type)  {
    let sum = 0;
    transactions[type].forEach(tran => {
      sum += tran.unit * tran.purchasePrice;
    });
    return sum;
  };

  function calTotalOfAll() {
    let sum = 0;
    if (Object.keys(transactions).length > 0) {
      Object.keys(transactions).forEach(type => {
        transactions[type].forEach(tran => {
          sum += tran.unit * tran.purchasePrice;
        });
      })
    }
    return sum;
  };

  function onDelete(type, index) {
    const newTransactions = {
      ...transactions,
      [type]: [...transactions[type]]
    };

    newTransactions[type].splice(index, 1);

    if (newTransactions[type].length === 0) {
      delete newTransactions[type];
    };

    setTransactions(newTransactions);
  };

  const cardStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridGap: '1rem'
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Hey</h1>
        </div>
        <div className="col text-right">
          <h1>MoneyTime</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="alert alert-success" role='alert'>
            <p>Total Money you have paid: A${calTotalOfAll()}. Transactions History:</p>
            {Object.keys(transactions).map((type) =>
              <div key={type}>
                <h4 className='text-center'>
                  {type} Unit Owned: { calTotalUnitPerType(type) },
                  Total Paid: { calTotalPaidPerType(type) }
                </h4>

                <div style = { cardStyle } >
                  { transactions[type].map((tran, index) =>
                    <div className='card text-center' key={index}>
                      <p>ID: { tran.id }</p>
                      <p>Unit: { tran.unit }</p>
                      <p>Purchase Price: { tran.purchasePrice }</p>
                      <p>Total Price: { tran.unit * tran.purchasePrice }</p>
                      <button className='alert alert-danger' onClick={() => onDelete(type, index)}>Delete</button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
};

export default MoneyTime;
