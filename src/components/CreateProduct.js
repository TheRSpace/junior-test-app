import { React, useEffect, useState, useRef } from "react";
import TypeSwitcher from "./TypeSwitcher";
import { useCheckSku, createProduct } from "../api/productApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FormInput from "./FormInput";
import ToCurrency from "./ToCurrency";
import { useNavigate } from "react-router-dom";
import validationsNew from "./validationsNew";

export default function CreateProduct() {
  const [productValueErrors, setProductValueErrors] = useState({});
  const [validated, setValidated] = useState(false);
  //const [skuState, setSkuState] = useCheckSku();
  //const isMounted = useMountedRef(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [productValues, setProductValues] = useState({
    sku: "",
    name: "",
    price: "",
    type: "",
    //type_name: "",
    attributes: {},
  });

  const queryClient = useQueryClient();
  //Create mutation for posting data
  const createProductMutation = useMutation({
    mutationFn: (product) => {
      return createProduct(product);
    },
    onSuccess: (data, error) => {
      console.log("worked", data);
      //const responseStatus = error?.response?.status;
      // if (error.response.status && error?.response?.status === 400) {
      //   console.log("Bad Requesting :", error.response.data);
      //   //return;
      // if (error) {
      // } else {}
      queryClient.invalidateQueries("products");
      navigate("/");
    },
    onError: (error) => {
      if (error.response && error?.response.status === 400) {
        // handle the 400 error
        console.error("Bad Request:", error.response.data);
      } else {
        // handle other errors
        //console.error("An error occurred:", error);
      }
    },
  });
  let navigate = useNavigate();

  const handlePriceFormat = (e) => {
    //validate??
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
  const handleBlur = (e) => {
    //validateForm(e.target.name);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //setProductValueErrors(validateInput(productValues));
    setIsSubmit(true);
    console.log(productValues.price.replace(/[^0-9.-]|(?<=\.\d{2}),/g, ""));
    // checkValidations();
    if ((await validateForm()) && isSubmit) {
      console.log("posted");
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
      //queryClient.invalidateQueries("products");
      // }
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
  // useEffect(() => {
  //   const validateAndSubmit = async () => {
  //     if (isSubmit) {
  //       if (await checkValidations()) {
  //         //console.log(productValues);
  //       }
  //     }
  //   };
  //   //let valueArray = Object.values(productValueErrors);
  //   //console.log(valueArray);
  //   // if (checkValidations() && isSubmit) {
  //   //   console.log(productValues);
  //   // }
  //   validateAndSubmit();
  // }, [productValues]);

  const handleCancel = () => {
    navigate("/");
  };

  const handleAttribute = (key, attributes) => {
    setProductValues((prevProduct) => ({ ...prevProduct, [key]: attributes }));
  };

  let checkSku = useCheckSku(productValues.sku);
  // useEffect(() => {
  //   //const checkSku = useCheckSku(productValues.sku);
  //   console.log("state");

  //   return () => {
  //     // Perform any necessary cleanup tasks here
  //   };
  // }, [checkSku]);

  const validateForm = async () => {
    let err = {};
    //const { name, value } = inputType.target;
    err = validationsNew(productValues, checkSku); //productValueError;

    //setProductValueErrors((prevErr) => ({ ...prevErr, ...err }));
    setProductValueErrors({ ...err });

    let valueArray = Object.values(err);
    console.log(valueArray, "vad");
    if (valueArray.every((x) => x === "")) {
      setValidated(true);
      return true;
    } else {
      //console.log(Object.keys(err).length);
      setValidated(false);
      return false;
    }
    //return checkValidations();
  };
  const checkValidations = () => {
    return new Promise((resolve, reject) => {
      let valueArray = Object.values(productValueErrors);
      console.log(valueArray);
      if (valueArray.every((x) => x === "")) {
        // setValidated(true);
        resolve(true);
      } else {
        // console.log(Object.keys(err).length);
        setValidated(false);
        resolve(false);
      }
    });
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
      //required: true,
      onChange: handleChange,
      //onBlur: handleBlur,
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
      //required: true,
      onChange: handleChange,
      //onBlur: handleBlur,
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
      //required: true,
      onBlur: handlePriceFormat,
      onChange: handlePriceChange,
      //onKeyUp: validateForm,
    },
  ];

  return (
    <div className="create-product-container">
      <form id="product_form" onSubmit={handleSubmit}>
        <h1 align="center">Create New Product</h1>

        <div className="product-input-container">
          {inputs?.map((input, index) => (
            <FormInput key={index} {...input} errorMessage={productValueErrors} value={productValues[input.name]} />
          ))}
          <label>Type switcher</label>
          <TypeSwitcher productValueError={productValueErrors} handleChange={handleChange} onBlur={handleBlur} handleAttributeChange={handleAttribute} {...productValues} />
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
