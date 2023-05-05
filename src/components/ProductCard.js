import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../assets/ProductCard.scss";
import ToCurrency from "./ToCurrency";

function ProductCard(props) {
  var { sku, name, price, type_name, size, weight, width, height, length } = props.product;
  var attributes = null;

  if (type_name === "Furniture") {
    attributes = `Dimension: ${height}x${width}x${length}`;
  } else if (type_name === "DVD") {
    attributes = `Size: ${size} MB`;
  } else {
    attributes = `Weight: ${weight} kg`;
  }
  const [isChecked, setIsChecked] = useState(false);

  function handleClick() {
    setIsChecked(!isChecked);
  }
  return (
    <div className="card-item" onClick={handleClick}>
      <input type="checkbox" className="delete-checkbox" checked={isChecked} onChange={() => {}}></input>
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
