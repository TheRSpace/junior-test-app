import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const productApi = axios.create({
  //baseURL: "https://raimondsjuniortestapp.000webhostapp.com",
  baseURL: "https://ec2-16-16-24-161.eu-north-1.compute.amazonaws.com",
  headers: {
    //"Content-Type": "application/octet-stream",
    // Add any other default headers you need
    //Authorization: "Bearer your_token",
  },
}); //"http://localhost:8080/" });

// export interface Product {
//   id: number;
//   sku: string;
//   name: string;
//   price: number;
// }
export const readProducts = async () => {
  const response = await productApi.get("/products");
  return response.data;
};
export const readTypes = async () => {
  const response = await productApi.get("/type");
  return response.data;
};
export const useReadTypes = () => {
  return useQuery(["types"], readTypes);
};
export const readSkus = async () => {
  const response = await productApi.get("/skus");
  return response.data;
};

//TODO Version 1
export const createProduct2 = async (product) => {
  var response;
  try {
    response = productApi.post("/product", product);
    return response;
  } catch (error) {
    //throw new Error(`Failed to create product.${response.data}`);
    throw new Error(response.data);
  }
};
//TODO Version 2
export const createProduct = async (product) => {
  //var response;
  try {
    const response = await productApi.post("/product", product, {
      headers: {
        "Content-Type": "text/plain", // Set the desired content type for this specific request
        // Add any other headers if needed
      },
    });
    return response;
  } catch (error) {
    //throw new Error(`Failed to create product.${response.data}`);
    throw error;
  }
};

// export const checkSku = async (sku) => {
//   const response = await productApi.get(`/validate/`, { params: { sku: sku } });
//   return response.data;
// };
export const checkSku = async (sku) => {
  // const response = await productApi.get(`/validate/?sku=${sku}`);
  // return response.data;
  return productApi.get(`/validate/?sku=${sku}`).then((response) => response.data);
};
export const useCheckSku = (sku) => {
  // var skuState = useQuery(["sku", sku], () => checkSku(sku), { enabled: !!sku, retry: false });
  // if (!skuState.data?.valid && skuState.data !== undefined) {
  //   return true;
  // }
  return useQuery(["sku", sku], () => checkSku(sku), { enabled: !!sku, retry: false });
};

export const updateProduct = async (product, id) => {
  return await productApi.patch(`/product/${id}`, product);
};
export const deleteProduct = async (id) => {
  return await productApi.delete(`/product/?id=${id}`);
};
export const deleteProduct2 = async (id) => {
  //var response;
  try {
    const response = await productApi.delete("/products", {
      data: id,
      headers: {
        //"Content-Type": "application/json", // Set the desired content type for this specific request
        "Content-Type": "text/plain",
      },
    });
    return response;
  } catch (error) {
    //throw new Error(`Failed to create product.${response.data}`);
    console.log("failed deleting");
    throw error;
  }
};
export default productApi;
