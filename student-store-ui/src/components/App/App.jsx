import * as React from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import Home from "../Home/Home";
import NotFound from "../NotFound/NotFound";
import ProductDetail from "../ProductDetail/ProductDetail";
import Footer from "../Footer/Footer";

const baseUrl = "https://codepath-store-api.herokuapp.com";

export default function App() {
  // states updated and/or passed on to child componenets
  let [products, setProducts] = useState([]);
  let [isFetching, setIsFetching] = useState(true); // used to display a loading screen while things are being fetched
  let [error, setError] = useState("");
  let [isOpen, setIsOpen] = useState(false); // whether sidebar is expanded
  let [shoppingCart, setShoppingCart] = useState([]);
  let [checkoutForm, setCheckoutForm] = useState({ name: "", email: "" });
  let [postSuccess, setPostSuccess] = useState(true);
  let [orderReceipt, setOrderReceipt] = useState([]); //

  /**
   * Get all of the products from the /store endpoint and populate the `products` array state variable
   */
  const populateProducts = () => {
    axios({
      method: "get",
      url: baseUrl + "/store",
    })
      .then((response) => {
        const productsFromRes = response.data.products;
        setProducts((products = [...productsFromRes]));
        setError("");
        if (productsFromRes.length === 0) {
          setError("length of products in the data is 0");
        }
      })
      .catch(() => {
        setError("length of products in the data is 0");
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  // change sidebar from open to closed, or vice versa
  let handleOnToggle = () => {
    setIsOpen((prevVal) => !prevVal);
  };

  /**
   * Update cart with new product.
   * If item already exists, increment its quantity.
   * If item is new, create new item and set its quantity to 1
   *
   * @param {Number} productId id of item we're attempting to add to cart
   */
  let handleAddItemToCart = (productId) => {
    const itemMatch = shoppingCart.find((item) => item.itemId === productId);
    const otherItems = shoppingCart.filter((item) => item.itemId !== productId);

    const updatedQuantity = itemMatch ? itemMatch.quantity + 1 : 1;
    const updatedCart = [
      ...otherItems,
      { itemId: productId, quantity: updatedQuantity },
    ];
    setShoppingCart([...updatedCart]);
  };

  /**
   * Remove one instance of the product from cart.
   *
   * @param {Number} productId id of item we're attempting to remove from cart
   */
  let handleRemoveItemFromCart = (productId) => {
    const itemMatch = shoppingCart.find((item) => item.itemId === productId);
    const otherItems = shoppingCart.filter((item) => item.itemId !== productId);
    if (itemMatch) {
      const updatedQuantity = itemMatch.quantity - 1;
      // if no more instances of item left, don't add to updated cart
      const updatedCart =
        updatedQuantity > 0
          ? [...otherItems, { itemId: productId, quantity: updatedQuantity }]
          : [...otherItems];
      setShoppingCart([...updatedCart]);
    }
  };

  let handleOnCheckoutFormChange = (name = "", value = "") => {
    setCheckoutForm({ name: name, email: value });
  };

  /**
   * POST request to /store endpoint, recording both the order's items and name/email of person who placed the order
   */
  let handleOnSubmitCheckoutForm = () => {
    axios
      .post(baseUrl + "/store", {
        user: { name: checkoutForm.name, email: checkoutForm.email },
        shoppingCart: [...shoppingCart],
      })
      .then(function (response) {
        const receiptLines = response.data.purchase.receipt.lines; // arr of "lines" in receipt of order
        setPostSuccess(true);
        setOrderReceipt(receiptLines);
      })
      .catch(function (error) {
        setPostSuccess(false);
      });
  };

  useEffect(() => {
    populateProducts();
  }, []);

  if (isFetching) {
    <h1 className="loading">Loading...</h1>;
  }

  return (
    <div className="wrapper">
      <BrowserRouter>
        <main>
          <Navbar className="navbar" />
          <Sidebar
            className="sidebar"
            isOpen={isOpen}
            shoppingCart={shoppingCart}
            setShoppingCart={setShoppingCart}
            orderReceipt={orderReceipt}
            products={products}
            postSuccess={postSuccess}
            checkoutForm={checkoutForm}
            handleOnCheckoutFormChange={handleOnCheckoutFormChange}
            handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm}
            handleOnToggle={handleOnToggle}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  className="home"
                  products={products}
                  shoppingCart={shoppingCart}
                  handleAddItemToCart={handleAddItemToCart}
                  handleRemoveItemToCart={handleRemoveItemFromCart}
                />
              }
            />
            <Route
              path="/products/:productId"
              element={
                <ProductDetail
                  className="product-detail"
                  setIsFetching={setIsFetching}
                  isFetching={isFetching}
                  shoppingCart={shoppingCart}
                  handleAddItemToCart={handleAddItemToCart}
                  handleRemoveItemToCart={handleRemoveItemFromCart}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <footer>
            <Footer />
          </footer>
        </main>
      </BrowserRouter>
    </div>
  );
}
