import * as React from "react";
import "./OrderCard.css";
import { Link } from "react-router-dom";
export default function OrderCard({
  id,
  name,
  email,
  total,
  createdAt,
  receipt,
  showReceipt,
}) {
  return (
    <Link className="order-wrapper" to={`/orders/${id}`}>
      <div className="order-card">
        <div className="order-main-info">
          <span className="orderer-name">{name}</span>
          <span className="order-total">${total}</span>
        </div>
        <span>Email: {email}</span>
        <span>Date: {createdAt}</span>
        {/* Only when we're in the single order view do we display the receipt.
            Only when the receipt is populated do we map over its items and display its contents.
         */}
        {showReceipt ? (
          <div className="receipt">
            <span className="receipt-label">Receipt: </span>
            <div className="receipt-content">
              {showReceipt && receipt?.lines?.length > 0
                ? receipt.lines.map((item) => (
                    <>
                      <br />
                      <span>{item}</span>
                      <br />
                    </>
                  ))
                : null}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </Link>
  );
}
