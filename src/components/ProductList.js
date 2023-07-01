import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { readProducts, deleteProduct, deleteProduct2 } from "../api/productApi";
import { useState } from "react";
import ProductCard from "./ProductCard";
import "../assets/ProductList.scss";

export default function ProductList() {
  // const [newProduct, setNewProduct] = useState("");
  // const queryClient = useQueryClient();
  const [selectedIds, setSelectedIds] = useState({});
  const [checkedValues, setCheckedValues] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  //const { isLoading, isError, error, data: products } = useQuery("products", readProducts);
  const productQuery = useQuery({ queryKey: ["products"], queryFn: readProducts }, { refetchOnWindowFocus: true });

  // const addProductMutation = useMutation(createProduct, {
  //   onSuccecss: () => queryClient.invalidateQueries("products"), //invalidates cache and refetch
  // });
  // const updateProductMutation = useMutation(updateProduct, {
  //   onSuccecss: () => queryClient.invalidateQueries("products"), //invalidates cache and refetch
  // });
  // const deleteProductMutation = useMutation(deleteProduct, {
  //   onSuccecss: () => queryClient.invalidateQueries("products"), //invalidates cache and refetch
  // });
  const queryClient = useQueryClient();
  const deleteProductMutation = useMutation({
    mutationFn: (id) => {
      return deleteProduct2(id);
    },
    onSuccess: (data, error) => {
      console.log("Product deleted succesfully!");
      setCheckedValues([]);
      //const responseStatus = error?.response?.status;
      // if (error.response.status && error?.response?.status === 400) {
      //   console.log("Bad Requesting :", error.response.data);
      //   //return;
      // if (error) {
      // } else {}
      queryClient.invalidateQueries("products");
      //navigate("/junior-test-app/");
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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   addProductMutation.mutate({ userid: 1, title: newProduct, completed: false });
  //   setNewProduct("");
  // };

  //handle mass delete
  const handleMassDelete = () => {
    var id = 1;
    deleteProductMutation.mutateAsync(
      //JSON.stringify({
      { id: checkedValues[0] }
      //})
    );
  };

  //handle product selection
  const handleSelection = () => {};

  const handleCheckBox = (event) => {
    let checked = event.target.checked;
    let value = +event.target.value;
    setIsChecked((prevState) => !prevState);
    if (checked) {
      //setCheckedValues((prevProduct) => ({ ...prevProduct, [name]: value }));
      setCheckedValues([...checkedValues, value]);
    } else {
      setCheckedValues((prevData) => {
        return [...prevData.filter((skill) => skill !== value)];
      });
    }
  };
  const handleDivCheckBox = (value, checked) => {
    //let checked = event.target.checked;
    //let value = +event.target.value;
    console.log("checking");
    console.log(checked);
    if (checked) {
      //setCheckedValues((prevProduct) => ({ ...prevProduct, [name]: value }));
      setCheckedValues([...checkedValues, value]);
    } else {
      setCheckedValues((prevData) => {
        return [...prevData.filter((skill) => skill !== value)];
      });
    }
  };
  return (
    <>
      <section>
        <br />
        <h1>Product list</h1>
        <button onClick={handleMassDelete} id="delete-product-btn" className="mass-delete">
          MASS DELETE
        </button>
        <div className="product-container">
          {productQuery.data?.map((product, index) => <ProductCard key={index} isChecked={isChecked} checkedValues={checkedValues} product={product} onSelection={handleSelection} handleCheckBox={handleCheckBox} handleDivCheckBox={handleDivCheckBox} />) ?? (
            <div align="center">
              <h3>No products Found</h3>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
