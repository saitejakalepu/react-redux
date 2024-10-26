import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../store/cartSlice";
import "./ProductGrid.css";
import { fetchProducts } from "../store/productSlice";

const ProductGrid = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const searchQuery = useSelector((state) => state.search.searchQuery);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product));
  };

  const filteredItems = products.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid-container">
      {filteredItems.map((product) => (
        <div key={product.id} className="grid-item">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
          <h2 className="product-title">{product.title}</h2>
          <p className="product-price">${product.price}</p>
          <p className="product-description">{product.description}</p>
          <p className="product-rating">
            Rating: {product.rating.rate} ({product.rating.count} reviews)
          </p>
          <button
            onClick={() => handleAddToCart(product)}
            className="add-to-cart-button"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
