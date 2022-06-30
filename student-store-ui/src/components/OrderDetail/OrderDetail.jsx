import * as React from "react";
import "./OrderDetail.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NotFound from "../NotFound/NotFound";
import OrderCard from "../OrderCard/OrderCard";

export default function OrderDetail() {
  const baseUrl = "http://localhost:3001";
  let { orderId } = useParams();
  let [purchase, setPurchase] = useState({});
  let [isBroken, setIsBroken] = useState(false);

  /**
   * Execute a GET request to get an individual purchase's details, and set the purchase state variable to the contents of the response
   */
  useEffect(() => {
    axios({
      method: "get",
      url: `${baseUrl}/store/orders/${orderId}`,
    })
      .then((response) => {
        setPurchase(response.data.purchase);
      })
      .catch(() => {
        setIsBroken(true);
      });
  }, []);

  return (
    <div className="order-detail">
      {isBroken ? (
        <NotFound />
      ) : (
        <OrderCard
          id={purchase.id}
          name={purchase.name}
          email={purchase.email}
          receipt={purchase.receipt}
          showReceipt={true}
          total={purchase.total}
          createdAt={purchase.createdAt}
        />
      )}
    </div>
  );
}
