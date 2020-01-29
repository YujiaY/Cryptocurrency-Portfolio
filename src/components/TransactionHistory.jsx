import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditCard from './EditCard';
import NormalCard from './NormalCard';

const TransactionHistory = (props) => {
  const {
    transactions,
    setTransactions,
  } = props;

  // For editing transactions
  const [isEditing, setIsEditing] = useState(false);
  const [editingCardIndex, setEditingCardIndex] = useState([-1, -1]);
  const [unitToEdit, setUnitToEdit] = useState(null);
  const [priceToEdit, setPriceToEdit] = useState(null);
  // For updating current value
  const [currentValueOfAll, setCurrentValueOfAll] = useState('N/A');
  const [updateTime, setUpdateTime] = useState('N/A');

  function calTotalPaidPerType(index) {
    let sum = 0;
    transactions[index].history.forEach((tran) => {
      sum += tran.unit * tran.purchasePrice;
    });
    return sum;
  }

  function calTotalUnitPerType(index) {
    let sum = 0;
    transactions[index].history.forEach((tran) => {
      sum += +tran.unit;
    });
    return sum;
  }

  function calTotalCostOfAll() {
    let sum = 0;
    if (transactions.length > 0) {
      transactions.forEach((tran) => {
        tran.history.forEach((history) => {
          sum += history.unit * history.purchasePrice;
        });
      });
    }
    return sum;
  }

  // eslint-disable-next-line consistent-return
  async function calCurrentValueOfAll() {
    if (transactions.length === 0) {
      return setCurrentValueOfAll(0);
    }
    let sum = 0;
    const idArr = [];
    transactions.forEach((tran) => {
      idArr.push(tran.id);
    });
    // Fetch current value
    const res = await axios.get(`http://localhost:1368/current?idArr=${idArr}`);
    const { data } = res.data;
    const newTransaction = [...transactions];
    newTransaction.forEach((item, index) => {
      // eslint-disable-next-line no-param-reassign
      item.currentPrice = data[item.id].quote.AUD.price;
      sum += calTotalUnitPerType(index) * item.currentPrice;
    });
    setCurrentValueOfAll(sum);
    setUpdateTime(new Date(Object.values(data)[0].last_updated).toLocaleString());
  }

  function onDelete(tranIndex, historyIndex) {
    const newTransactions = [...transactions];
    newTransactions[tranIndex].history.splice(historyIndex, 1);
    if (newTransactions[tranIndex].history.length === 0) {
      newTransactions.splice(tranIndex, 1);
    }
    setTransactions(newTransactions);
  }

  function onSave(tranIndex, historyIndex) {
    const newTransactions = [...transactions];
    newTransactions[tranIndex].history[historyIndex].unit = unitToEdit;
    newTransactions[tranIndex].history[historyIndex].purchasePrice = priceToEdit;
    setTransactions(newTransactions);
    // Roll back to normal mode
    setIsEditing(false);
    setEditingCardIndex([-1, -1]);
  }

  // eslint-disable-next-line consistent-return
  function onEdit(tranIndex, historyIndex) {
    if (isEditing) {
      // eslint-disable-next-line no-undef
      return alert('Please only edit one in a time.');
    }
    setIsEditing(true);
    setEditingCardIndex([tranIndex, historyIndex]);
    setUnitToEdit(transactions[tranIndex].history[historyIndex].unit);
    setPriceToEdit(transactions[tranIndex].history[historyIndex].purchasePrice);
  }

  function handleFormUnitChange(e) {
    setUnitToEdit(e.target.value);
  }

  function handleFormPriceChange(e) {
    setPriceToEdit(e.target.value);
  }

  useEffect(() => {
    calCurrentValueOfAll()
      .then(() => console.log('Update API call responsed.'));
  }, [transactions]);

  return (
    <div className="alert alert-success">
      <h3 className="text-center">Transactions History:</h3>

      <div className="row">
        <div className="col">
          <div className="alert alert-success">
            <p>
              Total Money you have invested: A$
              {calTotalCostOfAll()}
            </p>
            <p>
              And your assets are now worth: A$
              {currentValueOfAll}
              . (Last updated at:
              {updateTime}
              )
            </p>
            <button
              type="submit"
              className="primary alert-primary"
              onClick={calCurrentValueOfAll}
            >
              Update Current Value
            </button>
          </div>
        </div>
      </div>

      {transactions.map((item, tranIndex) => (
        <div key={item.name}>
          <h5 className="text-center">
            Coin Type:
            {item.name}
            ,
            Unit Owned:
            {calTotalUnitPerType(tranIndex)}
            ,
            Total Paid:
            {calTotalPaidPerType(tranIndex)}
          </h5>

          <div className="card-container">
            {/* Loop in all types of coins */}
            {/* eslint-disable-next-line react/no-array-index-key */}
            {transactions[tranIndex].history.map((tran, historyIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <div className="card text-center" key={historyIndex}>

                {/* Loop in all trans records in each coin */}
                {(tranIndex === editingCardIndex[0] && historyIndex === editingCardIndex[1])
                  ? (
                    <EditCard
                      unitToEdit={unitToEdit}
                      priceToEdit={priceToEdit}
                      handleFormUnitChange={(e) => handleFormUnitChange(e)}
                      handleFormPriceChange={(e) => handleFormPriceChange(e)}
                      onSave={() => onSave(tranIndex, historyIndex)}
                    />
                  )
                  : (
                    <NormalCard
                      unit={tran.unit}
                      purchasePrice={tran.purchasePrice}
                      onDelete={() => onDelete(tranIndex, historyIndex)}
                      onEdit={() => onEdit(tranIndex, historyIndex)}
                    />
                  )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionHistory;
