import { useState } from "react";
import React from "react";

const validations = (productValues, checkSku, inputName) => {
  //const [productValueError, setProductValueError] = useState({});
  let err = {};
  //validateForm();
  const validateSku = () => {
    //let err = {};
    err.sku = "";
    if (!productValues.sku) {
      err.sku = "SKU required";
      //setProductValueError({ ...err });
    } else if (!productValues.sku.match(/^[a-zA-Z0-9-]+$/gi)) {
      err.sku = "SKU format invalid we accept only numbers or symbol: -";
    } else if (!checkSku.data?.valid && checkSku.data !== undefined) {
      err.sku = "SKU already exists in database";
    }
    //setProductValueError((prevErr) => ({ ...prevErr, ...err }));
  };
  const validateName = () => {
    //let err = {};
    err.name = "";
    if (!productValues.name) {
      err.name = "Name required";
    }
    //setProductValueError((prevErr) => ({ ...prevErr, ...err }));
  };
  const validatePrice = () => {
    //let err = {};
    err.price = "";
    let price = productValues.price;
    if (!productValues.price) {
      err.price = "Price required";
    } else if (price === "$0.00") {
      err.price = "Price can't be 0";
    }
    //setProductValueError((prevErr) => ({ ...prevErr, ...err }));
  };
  const validateType = () => {
    //let err = {};
    err.type = "";
    if (!productValues.type) {
      err.type = "Choosing a type required";
    }
    //setProductValueError((prevErr) => ({ ...prevErr, ...err }));
  };
  const validateHeight = () => {
    //let err = {};
    err.height = "";
    if (!productValues.attributes.height) {
      err.height = "Height required";
    }
    //setProductValueError((prevErr) => ({ ...prevErr, ...err }));
  };
  const validateWidth = () => {
    //let err = {};
    err.width = "";
    if (!productValues.attributes.width) {
      err.width = "Width required";
    }
    // setProductValueError((prevErr) => ({ ...prevErr, ...err }));
  };
  const validateLength = () => {
    //let err = {};
    err.length = "";
    if (!productValues.attributes.length) {
      err.length = "Length required";
    }
    //setProductValueError((prevErr) => ({ ...prevErr, ...err }));
  };
  // const validateForm = () => {
  //let err = {}; //productValueError;
  //if (inputType === "sku") {
  // err.sku = "";
  // console.log(checkSku.data);
  // if (!productValues.sku) {
  //   err.sku = "SKU required";
  //   //setProductValueError({ ...err });
  // } else if (!productValues.sku.match(getRegex(inputType))) {
  //   err.sku = "SKU format invalid we accept only numbers or symbol: -";
  // } else if (!checkSku.data?.valid && checkSku.data !== undefined) {
  //   err.sku = "SKU already exists in database";
  // }
  // validateSku();
  // validateName();
  // validatePrice();
  // validateType();
  // validateHeight();
  // validateWidth();
  // validateLength();
  if (inputName === "sku") {
    validateSku();
  }
  if (inputName === "name") {
    validateName();
  }
  if (inputName === "price") {
    validatePrice();
  }
  if (inputName === "type") {
    validateType();
  }
  //}
  // if (inputType === "name") {
  //   err.name = "";
  //   if (!productValues.name) {
  //     err.name = "Name required";
  //   }
  // }
  //setProductValueError((prevErr) => ({ ...prevErr, ...err }));
  //};
  return err;
};

export default validations;
