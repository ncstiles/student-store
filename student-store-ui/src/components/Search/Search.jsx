import * as React from "react"
import { useEffect } from "react";
import "./Search.css"
import Input from '@mui/material/Input';

export default function Search({products, searchInput, setSearchInput, searchResults, setSearchResults, filteredProducts, setFilteredProducts, filterCategory, setFilterCategory}) {
    /**
     * Determine whether any of the tokens in `searchStr` are substrings of either the product's name or category
     * 
     * @param {string} searchStr text entered into search bar
     * @param {string} name product's name
     * @param {string} category product's category
     * @returns a boolean representing if the search token matches a substring in the product's name or category
     */
    const containsMatch = (searchStr, productName, productCategory) => {
        return searchStr.split(/(\s+)/)
            .filter(token => token !== ' ') //remove whitespace tokens
            .reduce((prev, token) => {
                return productName.toLowerCase().includes(token.toLowerCase())
                        ||
                        productCategory.toLowerCase().includes(token.toLowerCase())
                        || 
                        prev}, false)
    }
    
    /**
     * Upon change in product offerings or upon filter category change, determine subset of products whose category
     * matches the filtered category
     */
    useEffect(() => {
        if (filterCategory === 'all') {
            setFilteredProducts([...products])
        }
        else {
            const newFilteredItems = products.filter(product => product.category === filterCategory)
            setFilteredProducts(newFilteredItems);
        }
    }, [products, filterCategory])
    
    /**
     * Upon change of filtered products or change in input text, determine subset 
     * of filtered products whose information is associated with the input search string 
     */
    useEffect(() => {
        if (searchInput === '' && filteredProducts.length === 0) { // first render of page, so display all products
            setSearchResults([...products])
        }
        else if (searchInput === '') { // nothing searched, so display all filtered products
            setSearchResults([...filteredProducts])
        } else { // determine which products match search input and filter category
            let newSearchResults = filteredProducts.filter(product => containsMatch(searchInput, product.name, product.category))
            setSearchResults(newSearchResults)
        }
    }, [filteredProducts, searchInput])

    const setClassName = (buttonName) => {
        return filterCategory === buttonName ? 'active' : ''
    }
      
  return (
    <>
        <div className='search-and-header'>
            <div className="search">
                <Input  className='searchInput'
                        type="search" 
                        id="search-input" 
                        name="query"
                        size='30'
                        placeholder="Search for item... "
                        aria-label="Search for product"
                        inputProps={{ style: { color: "white"} }} // material UI Input comes with default styling
                        onChange={(e) => setSearchInput(e.target.value)}/>
            </div>
        </div>
              
        <div className='filter-products'>
            <ul className='filter-options'>
                <li className={setClassName('all')}>
                  <button onClick={()=>setFilterCategory('all')}>All</button>
                </li>
                <li className={setClassName('tech')}>
                  <button onClick={()=>setFilterCategory('tech')}>Tech</button>
                  </li>
                <li className={setClassName('accessories')}>
                  <button onClick={()=>setFilterCategory('accessories')}>Accessories</button>
                  </li>
                <li className={setClassName('food')}>
                  <button onClick={()=>setFilterCategory('food')}>Food</button>
                  </li>
                <li className={setClassName('clothing')}>
                  <button onClick={()=>setFilterCategory('clothing')}>Clothing</button>
                </li>
            </ul>
        </div>
    </>
  )}