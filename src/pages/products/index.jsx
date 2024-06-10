import React, { useState, useEffect } from "react";
import axios from "axios";
import "./product.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [expandedProduct, setExpandedProduct] = useState(null);

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

  const handleExpand = (product) => {
    setExpandedProduct(product);
  };

  const handleClose = () => {
    setExpandedProduct(null);
  };

  return (
    <div className="container">
      {products.map((product) => (
        <div
          key={product.id}
          className="card"
          onClick={() => handleExpand(product)}
        >
          <img src={product.image} alt={product.title} />
          <div className="card-content">
            <h2 className="title">{product.title}</h2>
            <div className="price">${product.price}</div>
          </div>
        </div>
      ))}
      {expandedProduct && (
        <div className="expanded-card-overlay" onClick={handleClose}>
          <div className="expanded-card">
            <div className="image-container">
              <img src={expandedProduct.image} alt={expandedProduct.title} />
            </div>
            <div className="text-container">
              <h2 className="title">{expandedProduct.title}</h2>
              <div className="price">${expandedProduct.price}</div>
              <p className="description">{expandedProduct.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
