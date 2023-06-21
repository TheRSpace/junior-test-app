import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const productApi = axios.create({
  baseURL: "https://raimondsjuniortestapp.000webhostapp.com",
  headers: {
    "Content-Type": "application/json",
    // Add any other default headers you need
    Authorization: "Bearer your_token",
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
export const createProduct = async (product) => {
  var response;
  try {
    response = productApi.post("/product", product);
    return response;
  } catch (error) {
    //throw new Error(`Failed to create product.${response.data}`);
    throw new Error(response.data);
  }
};

// export const checkSku = async (sku) => {
//   const response = await productApi.get(`/validate/`, { params: { sku: sku } });
//   return response.data;
// };
export const checkSku = async (sku) => {
  const response = await productApi.get(`/validate/?sku=${sku}`);
  return response.data;
};
export const useCheckSku = (sku) => {
  return useQuery(["sku", sku], () => checkSku(sku), { enabled: !!sku, retry: false });
};

export const updateProduct = async (product, id) => {
  return await productApi.patch(`/product/${id}`, product);
};
export const deleteProduct = async (id) => {
  return await productApi.delete(`/product/${id}`, id);
};
export default productApi;
