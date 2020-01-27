import React from 'react';

const EditCard = (props) => {
  const {
    unitToEdit,
    priceToEdit,
    handleFormUnitChange,
    handleFormPriceChange,
    onSave,
  } = props;

  return (
    <div>
      <p>Unit: </p>
      <input
        type="number"
        value={unitToEdit}
        onChange={handleFormUnitChange}
      />
      <p>Purchase Price: </p>
      <input
        type="number"
        value={priceToEdit}
        onChange={handleFormPriceChange}
      />
      <button type="button" className="btn btn-primary" onClick={onSave}>Save</button>
    </div>
  );
};

export default EditCard;
