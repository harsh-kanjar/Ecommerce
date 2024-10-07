import { useContext, useEffect } from "react";
import productContext from "../context/products/productContext";
import {ProductCard} from '../Components'

function Products() {
  const context = useContext(productContext); // Fetching products
  const { products, getAllProduct } = context; //destructuring

  return (
    <>
      <ProductCard products={products} getAllProduct={getAllProduct} />
    </>
  )
}

export default Products
