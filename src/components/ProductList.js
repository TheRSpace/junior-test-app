import { useQuery, useQueryClient } from "@tanstack/react-query";
import { readProducts, deleteProduct } from "../api/productApi";
import { useState } from "react";
import ProductCard from "./ProductCard";
import "../assets/ProductList.scss";

export default function ProductList() {
  // const [newProduct, setNewProduct] = useState("");
  // const queryClient = useQueryClient();
  const [selectedIds, setSelectedIds] = useState([]);
  //const { isLoading, isError, error, data: products } = useQuery("products", readProducts);
  const productQuery = useQuery({ queryKey: ["products"], queryFn: readProducts });

  // const addProductMutation = useMutation(createProduct, {
  //   onSuccecss: () => queryClient.invalidateQueries("products"), //invalidates cache and refetch
  // });
  // const updateProductMutation = useMutation(updateProduct, {
  //   onSuccecss: () => queryClient.invalidateQueries("products"), //invalidates cache and refetch
  // });
  // const deleteProductMutation = useMutation(deleteProduct, {
  //   onSuccecss: () => queryClient.invalidateQueries("products"), //invalidates cache and refetch
  // });

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   addProductMutation.mutate({ userid: 1, title: newProduct, completed: false });
  //   setNewProduct("");
  // };

  //handle mass delete
  const handleMassDelete = () => {};

  //handle product selection
  const handleSelection = () => {};
  return (
    <>
      <section>
        <br />
        <h1>Product list</h1>
        <button onClick={handleMassDelete} id="delete-product-btn" className="mass-delete">
          MASS DELETE
        </button>
        <div className="product-container">
          {productQuery.data?.map((product) => <ProductCard key={product.id} product={product} onSelection={handleSelection} />) ?? (
            <div align="center">
              <h3>No products Found</h3>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
