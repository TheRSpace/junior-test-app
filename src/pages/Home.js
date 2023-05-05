import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "../components/ProductList";

function Home() {
  // const [productsTotal, setProductsTotal] = useState(undefined);
  // const [products, setProducts] = useState([]);

  // const fetchProducts = async () => {
  //   const res = await fetch(`http://localhost/junior_test_app_api/products`);
  // };

  // useEffect(() => {
  //   fetchProducts().then((products) => {
  //     console.log(products);
  //   });
  // }, []);

  return (
    <>
      <ProductList />
    </>
  );
}
export default Home;
