import * as React from "react";
import "./Home.css";
import { useState } from "react";

import Hero from "../Hero/Hero";
import ProductGrid from "../ProductGrid/ProductGrid";
import About from "../About/About";
import Contact from "../Contact/Contact";
import ProductSearch from "../ProductSearch/ProductSearch";

export default function Home({
  products,
  shoppingCart,
  handleAddItemToCart,
  handleRemoveItemToCart,
}) {
  let [filterCategory, setFilterCategory] = useState("all");
  let [filteredProducts, setFilteredProducts] = useState([]);
  let [searchInput, setSearchInput] = useState("");
  let [searchResults, setSearchResults] = useState([]);

  return (
    <>
      <div id="home-top" className="home">
        <header>
          <Hero className="hero" />
        </header>

        <div id="content-top" className="contents">
          <ProductSearch
            products={products}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            filteredProducts={filteredProducts}
            setFilteredProducts={setFilteredProducts}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            searchResults={searchResults}
            setSearchResults={setSearchResults}
          />

          <ProductGrid
            products={products}
            filteredProducts={filteredProducts}
            searchResults={searchResults}
            shoppingCart={shoppingCart}
            handleAddItemToCart={handleAddItemToCart}
            handleRemoveItemToCart={handleRemoveItemToCart}
          />
          <About />
          <div id="contact">
            <Contact />
          </div>
        </div>
      </div>
    </>
  );
}
