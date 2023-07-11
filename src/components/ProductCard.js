import React from "react";
import "../assets/ProductCard.scss";
import ToCurrency from "../components2/ToCurrency";

function ProductCard(props) {
  //const [checkedValues, setCheckedValues] = useState([]);
  var { id, sku, name, price, type_name, size, weight, width, height, length } = props.product;
  const handleCheckBox = props.handleCheckBox;
  var checkedValues = props.checkedValues;
  var attributes = null;

  if (type_name === "Furniture") {
    attributes = `Dimension: ${height}x${width}x${length}`;
  } else if (type_name === "DVD") {
    attributes = `Size: ${size} MB`;
  } else {
    attributes = `Weight: ${weight} kg`;
  }

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
