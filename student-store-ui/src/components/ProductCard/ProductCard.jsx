import * as React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import IndeterminateCheckBoxRoundedIcon from "@mui/icons-material/IndeterminateCheckBoxRounded";

export default function ProductCard({
  product,
  productId,
  quantity,
  handleAddItemToCart,
  handleRemoveItemFromCart,
  showDescription = false,
}) {
  return (
    <div className="product-card">
      <div className="media">
        <Link to={`products/${productId}`}>
          <img className="product-img" src={product.image}></img>
        </Link>
      </div>
      <div className="single-product-info">
        {/* all text info about a product */}
        <div className="main-info">
          <h4 className="product-name">{product.name}</h4>
          <h4 className="product-price">${product?.price?.toFixed(2)}</h4>
          <div className="product-description">
            {/* description only displayed in the ProductDetail view, not the ProductGrid view */}
            {showDescription ? (
              <p className="product-description">{product.description}</p>
            ) : (
              <></>
            )}
          </div>
        </div>

        {/* number of product instances in shopping cart */}
        <div className="quantity-info">
          <div className="button-wrapper">
            <AddBoxRoundedIcon
              className="add"
              onClick={() => handleAddItemToCart(productId)}
            />
            <IndeterminateCheckBoxRoundedIcon
              className="remove"
              onClick={() => handleRemoveItemFromCart(productId)}
            />
          </div>
          <div className="product-quantity">
            {/* only render the product quantity if product exists */}
            {quantity === 0 ? (
              <></>
            ) : (
              <span className="qty-span">{quantity}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
