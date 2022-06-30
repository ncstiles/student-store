import * as React from "react";
import "./OrderGrid.css";
import { useEffect, useState } from "react";
import axios from "axios";

import OrderCard from "../OrderCard/OrderCard";
import Input from "@mui/material/Input";
import NotFound from "../NotFound/NotFound";

const baseUrl = "http://localhost:3001";

export default function OrderGrid({ orderReceipt }) {
  let [searchInput, setSearchInput] = useState("");
  let [purchases, setPurchases] = useState([]);
  let [filteredPurchases, setFilteredPurchases] = useState([]); // purchases whose email starts with the searched text
  let [displayPurchases, setDisplayPurchases] = useState([]); //purchases to render

  /**
   * Complete GET request to get all previous order information (list of objects) and set the purchases state to the response
   */
  useEffect(() => {
    axios({
      method: "get",
      url: baseUrl + "/store/orders",
    }).then(function (response) {
      //
      setPurchases(response.data.orderHistory);
      //
    });
  }, []);

  /**
   * Upon change in purchase history or search input text, determine subset of previous purchases whose email
   * starts with the search input text.
   */
  useEffect(() => {
    const newFilteredPurchases = purchases.filter((purchase) =>
      purchase.email.startsWith(searchInput)
    );

    setFilteredPurchases(newFilteredPurchases);
  }, [purchases, searchInput, orderReceipt]);

  /**
   * The useEffect directly above triggers this useEffect because it updates `filteredPurchases`.
   * Upon a change of `filteredPurchases` or a change in search input text, determine the subset
   * of purchases to display.
   */
  useEffect(() => {
    // display all previous purchases when not text is in search bar
    if (searchInput === "") {
      setDisplayPurchases([...purchases]);
    } else {
      // display only the purchases that start with search bar text
      setDisplayPurchases([...filteredPurchases]);
    }
  }, [filteredPurchases, searchInput]);

  return (
    <div className="order-page">
      <div className="orders">
        <h1 className="order-intro"> Order History </h1>
        <Input
          className="search-input"
          type="search"
          name="query"
          size="30"
          placeholder="Filter by email..."
          aria-label="Filter purchases by email"
          inputProps={{ style: { color: "white" } }} // material UI Input comes with default styling
          onChange={(e) => setSearchInput(e.target.value)}
        />
        {displayPurchases?.length > 0 ? (
          <div className="order-grid">
            {displayPurchases.map((purchase) => (
              <OrderCard
                id={purchase.id}
                name={purchase.name}
                email={purchase.email}
                receipt={purchase.receipt}
                showReceipt={false}
                total={purchase.total}
                createdAt={purchase.createdAt}
              />
            ))}
          </div>
        ) : (
          <NotFound />
        )}
      </div>
    </div>
  );
}
