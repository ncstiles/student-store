import * as React from "react";
import "./Sidebar.css";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

export default function Sidebar({
  setCheckoutForm,
  isOpen,
  orderReceipt,
  shoppingCart,
  setShoppingCart,
  products,
  checkoutForm,
  handleOnCheckoutFormChange,
  handleOnSubmitCheckoutForm,
  handleOnToggle,
}) {
  const namesOfClasses = `sidebar ${isOpen ? "open" : "closed"}`;

  // only when sidebar is open do we render the shopping cart and checkout form
  const renderCartCheckout = isOpen ? (
    <div className="cart-and-form">
      <ShoppingCart
        isOpen={isOpen}
        products={products}
        shoppingCart={shoppingCart}
        setShoppingCart={setShoppingCart}
      />
      <CheckoutForm
        isOpen={isOpen}
        setCheckoutForm={setCheckoutForm}
        orderReceipt={orderReceipt}
        shoppingCart={shoppingCart}
        setShoppingCart={setShoppingCart}
        checkoutForm={checkoutForm}
        handleOnCheckoutFormChange={handleOnCheckoutFormChange}
        handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm}
      />
    </div>
  ) : (
    <></>
  );
  return (
    <section className={namesOfClasses}>
      {isOpen ? (
        <ArrowBackRoundedIcon
          className="icon toggle-button"
          onClick={() => handleOnToggle()}
        />
      ) : (
        <ArrowForwardRoundedIcon
          className="icon toggle-button"
          onClick={() => handleOnToggle()}
        />
      )}
      {renderCartCheckout}
    </section>
  );
}
