import * as React from "react";
import "./CheckoutForm.css";
import PointOfSaleRoundedIcon from "@mui/icons-material/PointOfSaleRounded";

export default function CheckoutForm({
  setCheckoutForm,
  isOpen,
  orderReceipt,
  shoppingCart,
  setShoppingCart,
  checkoutForm,
  handleOnCheckoutFormChange,
  handleOnSubmitCheckoutForm,
}) {
  //Complete POST request with order and purchaser data, then reset shopping cart and purchaser info
  function checkoutSubmit() {
    setCheckoutForm({ name: "", email: "" });
    handleOnSubmitCheckoutForm();
    setShoppingCart([]);
  }

  return (
    <div className="checkout-form">
      <div className="checkout-info">
        <h2>Checkout</h2>
        <PointOfSaleRoundedIcon className="checkout-icon" />
      </div>

      <div className="email checkout-input-cols">
        <span>Email: </span>
        <input
          className="checkout-form-input"
          type="email"
          name="email"
          placeholder="student@codepath.org"
          value={checkoutForm.email}
          onChange={(e) =>
            handleOnCheckoutFormChange(e.target.name, e.target.value)
          }
          input
        />
      </div>

      <div className="name checkout-input-cols">
        <span>Name: </span>
        <input
          className="checkout-form-input"
          type="text"
          name="name"
          placeholder="Student Name"
          value={checkoutForm.name}
          onChange={(e) =>
            handleOnCheckoutFormChange(e.target.name, e.target.value)
          }
          input
        />
      </div>

      <button
        className="checkout-button"
        disabled={shoppingCart.length === 0 ? true : false}
        onClick={checkoutSubmit}
      >
        Checkout
      </button>

      <div id="order-status" className="order-status">
        {orderReceipt.map((line) => (
          <>
            <span className="success">{line}</span>
          </>
        ))}
      </div>
    </div>
  );
}
