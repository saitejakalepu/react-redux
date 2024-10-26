import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cartActions";
import "./ProductGrid.css";
import { fetchItems } from "../../store/itemsActions";

const ProductGrid = () => {
  const Dispatch = useDispatch();
  const {
    loading,
    data: products,
    error,
  } = useSelector((state) => state.myitems);

  const searchQuery = useSelector((state) => state.search.searchQuery); // Use search query from search reducer

  useEffect(() => {
    Dispatch(fetchItems());
  }, [Dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleAddToCart = (product) => {
    Dispatch(addItemToCart(product));
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
