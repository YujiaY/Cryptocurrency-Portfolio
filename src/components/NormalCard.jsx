import React from 'react';

const NormalCard = (props) => {
  const {
    unit,
    purchasePrice,
    onDelete,
    onEdit,
  } = props;

  return (
    <div>
      <p>Unit: </p>
      <p>{ unit }</p>
      <p>Purchase Price: </p>
      <p>{ purchasePrice }</p>
      <p>Total Price: </p>
      <p>{ unit * purchasePrice }</p>
      <button
        type="button"
        className="alert alert-danger"
        onClick={onDelete}
      >
        Delete
      </button>
      <button
        type="button"
        className="btn btn-primary"
        onClick={onEdit}
      >
        Edit
      </button>
    </div>
  );
};

export default NormalCard;
