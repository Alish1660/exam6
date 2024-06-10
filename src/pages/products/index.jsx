import React, { useState, useEffect } from "react";
import axios from "axios";
import "./product.css";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      {products.map((product) => (
        <div key={product.id} className="card">
          <img src={product.image} alt={product.title} />
          <div className="card-content">
            <h2 className="title">{product.title}</h2>
            <div className="price">${product.price}</div>
            <p className="description">{product.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
