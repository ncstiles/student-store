import * as React from "react"
import "./ProductDetail.css"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios";
import ProductView from '../ProductView/ProductView'
import NotFound from "../NotFound/NotFound";

export default function ProductDetail({setIsFetching, isFetching, shoppingCart, handleAddItemToCart, handleRemoveItemToCart}) {
  let [product, setProduct] = useState({})

  // get the parameter from the url when the user clicks on a product's image in Home
  let {productId} = useParams();
  const [isBroken, setIsBroken] = useState(false); // broken when GET request to the productId endpoint fails

  /**
   * Create a GET request using the specified `productId` to get the product's details
   * Set the `product` state to this updated information
   */
  useEffect(() => {
    setIsFetching(true) // while request is processing, render a "loading" screen
    axios({
      method: 'get',
      url: `https://codepath-store-api.herokuapp.com/store/${productId}`
    })
    .then((response) => {
      setProduct(response.data.product)
    })
    .catch((e) => {
      setIsBroken(true);
    })
    .finally(() => {
      setIsFetching(false)  
    });
    },[])

  if (isFetching) {
    <h1 className='loading'>Loading...</h1>
  }

  const sameItem = shoppingCart.find(cartItem => cartItem.itemId === product.id)
  const quantity = sameItem?.quantity || 0

  return (
    <div className='product-detail'>
      {isBroken ? <NotFound/> 
                  : 
                  <ProductView  product={product} 
                    productId={product.id} 
                    quantity={quantity} 
                    handleAddItemToCart={handleAddItemToCart}
                    handleRemoveItemToCart = {handleRemoveItemToCart}/>  
      }  
    </div> 
  )
}
