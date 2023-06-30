import React, { useState } from "react";
import { useReadTypes } from "../api/productApi";
import FormInput from "./FormInput";
import SelectComponent from "./SelectComponent";
import ValidationMessage from "./ValidationMessage";

const TypeSwitcher = (props) => {
  const { productValueError, onBlur, handleAttributeChange } = props;

  const [typeValues, setTypeValues] = useState({});

  //const [productValueError, setProductValueError] = useState({});

  const [selectedOption, setSelectedOption] = useState("");
  const typeQuery = useReadTypes();

  const handleSelect = (e) => {
    //reset all type values
    setTypeValues({});
    //set type in parent component
    props.handleChange(e);

    setSelectedOption(e.target.value);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTypeValues({ ...typeValues, [name]: value });
    handleAttributeChange("attributes", { ...typeValues, [name]: value });
  };
  const typeInputs = {
    Furniture: [
      {
        id: 1,
        name: "height",
        type: "number",
        placeholder: "Height",
        label: "Height",
        pattern: "\\d+(\\.\\d{1,2})?",
        step: "0.01",
        //min: "0",
        //required: true,
        onChange: handleChange,
        onBlur: onBlur,
        errorMessage: "Height must be a positive number",
      },
      {
        id: 2,
        name: "width",
        type: "number",
        placeholder: "Width",
        label: "Width",
        pattern: "\\d+(\\.\\d{1,2})?",
        step: "0.01",
        //min: "0",
        //required: true,
        onChange: handleChange,
        onBlur: onBlur,
      },
      {
        id: 3,
        name: "length",
        type: "number",
        placeholder: "Length",
        label: "Length",
        pattern: "\\d+(\\.\\d{1,2})?",
        step: "0.01",
        //min: "0",
        //required: true,
        onChange: handleChange,
        onBlur: onBlur,
      },
    ],
    DVD: [
      {
        id: 1,
        name: "size",
        type: "number",
        placeholder: "Size",
        label: "Size (MB)",
        pattern: "\\d+(\\.\\d{1,2})?",
        step: "0.01",
        //min: "0",
        //required: true,
        onChange: handleChange,
        onBlur: onBlur,
      },
    ],
    Book: [
      {
        id: 1,
        name: "weight",
        type: "number",
        placeholder: "Weight",
        label: "Weight (Kg)",
        pattern: "\\d+(\\.\\d{1,2})?",
        step: "0.01",
        //min: "0",
        //required: true,
        onChange: handleChange,
        onBlur: onBlur,
      },
    ],
  };

  return (
    <div className="switcher">
      {/* <select value={selectedOption} id="productType" name="type_name" onChange={handleSelect} onBlur={onBlur} required>
        <option value="">-- Select a type --</option>
        {typeQuery.data.map((productType) => (
          <option key={productType.id} value={productType.type_name}>
            {productType.type_name}
          </option>
        ))}
      </select> */}
      <SelectComponent productTypeQuery={typeQuery} selectedOption={selectedOption} id="productType" name="type" onChange={handleSelect} onBlur={onBlur} />
      <ValidationMessage errorMessage={productValueError["type"]} />
      {selectedOption && (
        <>
          {Object.keys(typeInputs)?.map((key, index) => {
            if (key === selectedOption) {
              // Validation check
              return (
                <div className="type-input-container" key={index}>
                  {typeInputs[key]?.map((input, index) => (
                    <FormInput {...input} errorMessage={productValueError} key={index} />
                  ))}
                </div>
              );
            } else {
              return null;
            }
          })}
        </>
      )}
    </div>
  );
};

export default TypeSwitcher;
