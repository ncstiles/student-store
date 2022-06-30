import * as React from "react";
import "./NotFound.css";

export default function NotFound() {
  return (
    <nav className="not-found">
      <h1 className="not-found-text">
        Oops - this item was not found in our product listing. Please modify
        your search, filter on a different category, or access a different
        endpoint.
      </h1>
    </nav>
  );
}
