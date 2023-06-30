import { React, useEffect, useState, useRef } from "react";
import TypeSwitcher from "./TypeSwitcher";
import { useCheckSku, createProduct } from "../api/productApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FormInput from "./FormInput";
import ToCurrency from "./ToCurrency";
import { useNavigate } from "react-router-dom";
import validations from "./validations";

export default function CreateProduct() {
  const [productValueError, setProductValueError] = useState({});
  const [validated, setValidated] = useState(false);
  //const [skuState, setSkuState] = useCheckSku();
  //const isMounted = useMountedRef(false);
  const firstRender = useRef(true);
  const [productValues, setProductValues] = useState({
    sku: "",
    name: "",
    price: "",
    type: "",
    //type_name: "",
    attributes: {},
  });

  //const { data, isError, refetch } = useCheckSku(productValues.sku);
  //const skuQuery = useQuery({ queryKey: ["product", productValues.sku], queryFn: checkSku }, { enabled: false, retry: false });
  //const validate = checkSku(productValues.sku);

  const queryClient = useQueryClient();
  //Create mutation for posting data
  const createProductMutation = useMutation({
    mutationFn: (product) => {
      createProduct(product);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("products");
      navigate("/junior-test-app/");
    },
    onError: (error) => {
      // if (createProductMutation.error.response && createProductMutation.error.response.status === 400) {
      //   // handle the 400 error
      //   console.error("Bad Request:", error.response.data);
      // } else {
      //   // handle other errors
      //   console.error("An error occurred:", error);
      // }
    },
  });
  let navigate = useNavigate();

  // const addProductMutation = useMutation(createProduct, {
  //   onSuccecss: () => queryClient.invalidateQueries("products"), //invalidates cache and refetch
  // });
  //Method one with rerendering

  const handlePriceFormat = (e) => {
    handleBlur(e);
    var newValue = 0;
    const { name, value } = e.target;
    //setInputs((values) => ({ ...values, [name]: name }));
    //if (e.target.name === "price") {
    if (value === "$NaN" || value === "" || value === "$") {
      newValue = "";
    } else {
      newValue = value.replace(/[^0-9.-]+/g, "");
      newValue = ToCurrency(newValue);
    }

    setProductValues({ ...productValues, [name]: newValue });
    //}
  };
  const handlePriceChange = (e) => {
    const regex = /[^0-9,.$]/g;
    const { name, value } = e.target;
    var newValue = value.replace(regex, "");
    setProductValues((prevProduct) => ({ ...prevProduct, [name]: newValue }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    //setProductValues({ ...productValues, [name]: value });
    setProductValues((prevProduct) => ({ ...prevProduct, [name]: value }));
  };
  // useEffect(() => {
  //   if (productValues.sku.length > 0) {
  //     validateForm();
  //   }
  // }, [productValues]);

  const handleBlur = (e) => {
    //validateForm(e.target.name);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    checkValidations();
    if (validated) {
      //if (checkSku.data?.valid) {
      createProductMutation.mutateAsync(
        JSON.stringify({
          sku: productValues.sku,
          name: productValues.name,
          price: productValues.price.replace(/[^0-9,.-]/, ""),
          type_name: productValues.type,
          attributes: productValues.attributes,
        })
      );
      queryClient.invalidateQueries("products");
      //}
    } else {
      console.log("Data not valid.");
    }

    //TODO! Version 2
    // if (validated) {
    //   const data = {
    //     sku: productValues.sku,
    //     name: productValues.name,
    //     price: productValues.price.replace(/[^0-9,.-]/, ""),
    //     type_name: productValues.type,
    //     attributes: productValues.attributes,
    //   };
    //   console.log(JSON.stringify(data));
    //   fetch("https://raimondsjuniortestapp.000webhostapp.com/product", {
    //     method: "POST",
    //     // headers: {
    //     //   "Content-Type": "application/json",
    //     // },
    //     body: JSON.stringify(data),
    //   })
    //     .then((response) => {
    //       // Handle the response
    //       //console.log(response);
    //       navigate("/junior-test-app/");
    //     })
    //     .catch((error) => {
    //       // Handle any errors
    //       console.log("Failed to post product!");
    //     });
    // }
  };
  const handleCancel = () => {
    navigate("/junior-test-app/");
  };

  const handleAttribute = (key, attributes) => {
    setProductValues((prevProduct) => ({ ...prevProduct, [key]: attributes }));
  };
  const getRegex = (inputName) => {
    var regex;
    if (inputName === "sku") {
      regex = /^[a-zA-Z0-9-]+$/gi;
      return regex;
    }
  };

  let checkSku = useCheckSku(productValues.sku);

  const validateSku = async () => {
    //const checkSku = await checkSku(productValues.sku);
    if (!firstRender.current) {
      let err = {};
      err.sku = "";
      if (!productValues.sku) {
        err.sku = "SKU required";
        //setProductValueError({ ...err });
      } else if (!productValues.sku.match(getRegex("sku"))) {
        err.sku = "SKU format invalid we accept only LETTERS NUMBERS or SYMBOL -";
      } //else if (checkSku) {
      else if (!checkSku.data?.valid && checkSku.data !== undefined) {
        err.sku = "SKU already exists in database";
      }
      setProductValueError((prevErr) => ({ ...prevErr, ...err }));
    }
  };
  const validateName = () => {
    let err = {};
    err.name = "";
    if (!productValues.name) {
      err.name = "Name required";
    }
    setProductValueError((prevErr) => ({ ...prevErr, ...err }));
  };

  useEffect(() => {
    if (firstRender.current) {
      // it's no longer the first render
      //console.log("da");
      return; // skip the code below
    } else {
      firstRender.current = false;
      validateSku();
      //console.log("ka");
    }
    return;
  }, [productValues.sku]);
  useEffect(() => {
    if (firstRender.current) {
      // it's no longer the first render
      //console.log("da");
      firstRender.current = false;
      return; // skip the code below
    } else {
      //firstRender.current = false;
      validateName();
      //console.log("ka");
    }
    return;
  }, [productValues.name]);
  // useEffect(() => {
  //   if (isMounted.current) {
  //     validatePrice();
  //   }
  // }, [productValues.price]);

  const validateForm = (inputType) => {
    let err = {};
    const { name, value } = inputType.target;
    //err = validations(productValues, checkSku, name); //productValueError;
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
    //validateSku();
    //validateName();
    //}
    // if (inputType === "name") {
    //   err.name = "";
    //   if (!productValues.name) {
    //     err.name = "Name required";
    //   }
    // }

    // if (inputType === "price") {
    //   err.price = "";
    //   if (!productValues.price) {
    //     err.price = "Price required";
    //   }
    // }
    // if (inputType === "type") {
    //   err.type = "";
    //   if (!productValues.type) {
    //     err.type = "Choosing a type required";
    //   }
    // }
    // if (inputType === "height") {
    //   err.height = "";
    //   if (!productValues.attributes.height) {
    //     err.height = "Height required";
    //   }
    // }
    // if (inputType === "width") {
    //   err.width = "";
    //   if (!productValues.attributes.width) {
    //     err.width = "Width required";
    //   }
    // }
    // if (inputType === "length") {
    //   err.length = "";
    //   if (!productValues.attributes.length) {
    //     err.length = "Length required";
    //   }
    // }
    setProductValueError((prevErr) => ({ ...prevErr, ...err }));
    //setProductValueError({ ...err });
    console.log(productValueError);

    let valueArray = Object.values(productValueError);
    console.log(valueArray);
    if (valueArray.every((x) => x === "")) {
      setValidated(true);
      //return true;
    } else {
      //console.log(Object.keys(err).length);
      setValidated(false);
      //return false;
    }
  };
  const checkValidations = () => {
    let valueArray = Object.values(productValueError);
    console.log(valueArray);
    if (valueArray.every((x) => x === "")) {
      setValidated(true);
      //return true;
    } else {
      //console.log(Object.keys(err).length);
      setValidated(false);
      //return false;
    }
  };
  const inputs = [
    {
      id: 1,
      name: "sku",
      type: "text",
      placeholder: "Product SKU",
      label: "SKU",
      pattern: "^[a-zA-Z0-9\\-]+$",
      //patternErrorMessage: getProductValueError("sku"),
      required: true,
      onChange: handleChange,
      onBlur: handleBlur,
      //onKeyUp: validateForm,
    },
    {
      id: 2,
      name: "name",
      type: "text",
      placeholder: "Product name",
      pattern: "[a-zA-Z]+",
      label: "Name",
      //patternErrorMessage: getProductValueError("name"), // "Name should only consist of letters",
      required: true,
      onChange: handleChange,
      onBlur: handleBlur,
      //onKeyUp: validateForm,
    },
    {
      id: 3,
      name: "price",
      type: "text",
      //pattern: "^d+(?:.d{1,2})?$",
      pattern: "^\\$\\d{1,3}(,\\d{3})*(\\.\\d+)?$",
      //datatype: "currency",
      placeholder: "$1,000.00",
      //defaultValue: "$ ",
      //patternErrorMessage: getProductValueError("price"), //"Price should be formated like 100,000.00",
      label: "Price",
      required: true,
      onBlur: handlePriceFormat,
      onChange: handlePriceChange,
      //onKeyUp: validateForm,
    },
  ];

  // const productInputs = {
  //   typeInputs: {
  //     Furniture: [
  //       {
  //         id: 1,
  //         name: "height",
  //         type: "text",
  //         placeholder: "Height",
  //         label: "Height",
  //         required: true,
  //         onChange: handleType,
  //       },
  //       {
  //         id: 2,
  //         name: "width",
  //         type: "text",
  //         placeholder: "Width",
  //         label: "Width",
  //         required: true,
  //         onChange: handleType,
  //       },
  //       {
  //         id: 3,
  //         name: "length",
  //         type: "text",
  //         onChange: handleType,
  //         placeholder: "Length",
  //         label: "Length",
  //         required: true,
  //       },
  //     ],
  //     DVD: [
  //       {
  //         id: 1,
  //         name: "size",
  //         type: "number",
  //         placeholder: "Size",
  //         label: "Size",
  //         required: true,
  //         onChange: handleType,
  //       },
  //     ],
  //     Book: [
  //       {
  //         id: 1,
  //         name: "weight",
  //         type: "text",
  //         placeholder: "Weight",
  //         label: "Weight",
  //         required: true,
  //         onChange: handleType,
  //       },
  //     ],
  //   },
  //   regularInputs: {
  //     inputs: [
  //       {
  //         id: 1,
  //         name: "sku",
  //         type: "text",
  //         placeholder: "Product SKU",
  //         label: "SKU",
  //         required: true,
  //         onChange: handleChange,
  //       },
  //       {
  //         id: 2,
  //         name: "name",
  //         type: "text",
  //         placeholder: "Product name",
  //         label: "Name",
  //         required: true,
  //         onChange: handleChange,
  //         //onChange={handleChange}
  //       },
  //       {
  //         id: 3,
  //         name: "price",
  //         type: "text",
  //         //pattern: "^d+(?:.d{1,2})?$",
  //         pattern: "^\\$\\d{1,3}(,\\d{3})*(\\.\\d+)?$",
  //         datatype: "currency",
  //         onBlur: handlePrice,
  //         onChange: handlePriceChange,
  //         placeholder: "$1,000.00",
  //         //defaultValue: "$ ",
  //         label: "Price",
  //         required: true,
  //       },
  //     ],
  //   },
  // };
  //TODO

  return (
    <div className="create-product-container">
      <form id="product_form" onSubmit={handleSubmit}>
        <h1 align="center">Create New Product</h1>

        <div className="product-input-container">
          {inputs?.map((input, index) => (
            <FormInput key={index} {...input} errorMessage={productValueError} value={productValues[input.name]} />
          ))}
          <label>Type switcher</label>
          <TypeSwitcher productValueError={productValueError} handleChange={handleChange} onBlur={handleBlur} handleAttributeChange={handleAttribute} {...productValues} />
        </div>

        <button className="save-btn" value="Save">
          Save
        </button>
        <button onClick={handleCancel} type="button" className="cancel-btn" value="Cancel">
          Cancel
        </button>
      </form>
    </div>
  );
}
// const useMountedRef = () => {
//   const mountedRef = useRef(false);
//   useEffect(() => {
//     setTimeout(() => {
//       mountedRef.current = true;
//     });
//   }, []);
//   return mountedRef;
// };
/* <div>
    {Object.keys(productInputs).map((key) => {
      <div>
        {Object.keys(productInputs[key]).map((subkey) => {
          <div>
            {productInputs[key][subkey].map((input) => (
              <div>
                wdawdawdaw
                <FormInput key={input.id} {...input} errorMessage={productValueError} value={productValues[input.name]} />
              </div>
            ))}
          </div>;
        })}
      </div>;
    })}
  </div> */
