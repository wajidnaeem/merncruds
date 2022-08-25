import React, { useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  useParams,
  Link,
} from "react-router-dom";
import { ShopContext } from "./context/ShopContext";

const Products = () => {
  const { fetchAllProducts, products } = useContext(ShopContext);

  useEffect(() => {
    fetchAllProducts();
    return () => {};
  }, [fetchAllProducts]);

  if (!products) return <div>Loading....</div>;

  return (
    <>
      <div className="mt-5">
        <div className="container">
          <div className="d-flex justify-content-center h1">Products</div>
        </div>
      </div>
    </>
  );
};

export default Products;
