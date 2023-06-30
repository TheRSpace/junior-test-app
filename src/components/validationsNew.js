import { useState } from "react";
import React from "react";

const validationsNew = (productValues, checkSku) => {
  //const [productValueError, setProductValueError] = useState({});
  let err = {};
  let attributeErr = {};
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
    attributeErr.height = "";
    if (!productValues.attributes.height) {
      attributeErr.height = "Height required";
    } else if (productValues.attributes.height === "0") {
      attributeErr.height = "height must be larger than 0";
    }
    //setProductValueError((prevErr) => ({ ...prevErr, ...err }));
  };
  const validateWidth = () => {
    //let err = {};
    attributeErr.width = "";
    if (!productValues.attributes.width) {
      attributeErr.width = "Width required";
    } else if (productValues.attributes.width === "0") {
      attributeErr.width = "Width must be larger than 0";
    }

    // setProductValueError((prevErr) => ({ ...prevErr, ...err }));
  };
  const validateLength = () => {
    //let err = {};
    attributeErr.length = "";
    if (!productValues.attributes.length) {
      attributeErr.length = "Length required";
    } else if (productValues.attributes.length === "0") {
      attributeErr.length = "Length must be larger than 0";
    }
    //setProductValueError((prevErr) => ({ ...prevErr, ...err }));
  };
  const validateSize = () => {
    //let err = {};
    attributeErr.size = "";
    if (!productValues.attributes.size) {
      attributeErr.size = "DVD size required";
    } else if (productValues.attributes.size === "0") {
      attributeErr.size = "DVD size must be larger than 0";
    }
    //setProductValueError((prevErr) => ({ ...prevErr, ...err }));
  };
  const validateWeight = () => {
    //let err = {};
    attributeErr.weight = "";
    if (!productValues.attributes.weight) {
      attributeErr.weight = "Weight required";
    } else if (productValues.attributes.weight === "0") {
      attributeErr.weight = "Weight must be larger than 0";
    }
    //setProductValueError((prevErr) => ({ ...prevErr, ...err }));
  };
  validateSku();
  validateName();
  validatePrice();
  validateType();
  attributeErr = {};
  if (productValues.type === "Furniture") {
    validateHeight();
    validateWidth();
    validateLength();
  } else if (productValues.type === "DVD") {
    validateSize();
  } else if (productValues.type === "Book") {
    validateWeight();
  }
  // validateHeight();
  // validateWidth();
  // validateLength();
  // if (inputName === "sku") {
  //   validateSku();
  // }
  // if (inputName === "name") {
  //   validateName();
  // }
  // if (inputName === "price") {
  //   validatePrice();
  // }
  // if (inputName === "type") {
  //   validateType();
  // }
  //}
  //setProductValueError((prevErr) => ({ ...prevErr, ...err }));
  //};
  return { ...err, ...attributeErr };
};

export default validationsNew;
