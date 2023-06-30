import React from "react";
import "../assets/SelectComponent.scss";

const SelectComponent = (props) => {
  const { id, name, selectedOption, productTypeQuery, onChange, onBlur } = props;
  return (
    <select className="minimal" value={selectedOption} id={id} name={name} onChange={onChange} onBlur={onBlur}>
      <option value="">-- Select a type --</option>
      {productTypeQuery?.data?.map((productType, index) => {
        const { type_name } = productType;
        return (
          <option key={index} value={type_name}>
            {type_name}
          </option>
        );
      })}
    </select>
  );
};

export default SelectComponent;
