import React from "react";
import { useState, useRef } from "react";
import "../assets/ProductCard.scss";
import ToCurrency from "./ToCurrency";

function ProductCard(props) {
  //const [checkedValues, setCheckedValues] = useState([]);
  var { id, sku, name, price, type_name, size, weight, width, height, length } = props.product;
  const handleCheckBox = props.handleCheckBox;
  const handleDivCheckBox = props.handleDivCheckBox;
  var checkedValues = props.checkedValues;
  var attributes = null;

  if (type_name === "Furniture") {
    attributes = `Dimension: ${height}x${width}x${length}`;
  } else if (type_name === "DVD") {
    attributes = `Size: ${size} MB`;
  } else {
    attributes = `Weight: ${weight} kg`;
  }
  const [isChecked, setIsChecked] = useState(false);
  const checkboxRef = useRef(null);

  const handleClick = () => {
    const event = {
      target: {
        value: id,
        checked: !checkedValues.includes(id),
      },
    };
    handleCheckBox(event);
  };

  return (
    <div className="card-item" onClick={handleClick}>
      <input type="checkbox" id={id} value={id} checked={checkedValues.includes(id)} className="delete-checkbox" onChange={handleCheckBox}></input>
      <div className="card-content">
        <h2 className="card-title">{name}</h2>
        <p className="card-description">
          {sku}
          <br />
          {ToCurrency(price)}
          <br />
          {attributes}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
