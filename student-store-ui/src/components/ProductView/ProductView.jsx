import * as React from "react"
import "./ProductView.css"
import ProductCard from "../ProductCard/ProductCard"

export default function ProductView({product, productId, quantity, handleAddItemToCart, handleRemoveItemToCart}) {
    return (
        <div className='product-view'>
            <h1 className='product-id'>Product # {productId}</h1>
            <div className="prod-view-card">
                <ProductCard
                            product = {product} 
                            productId = {productId} 
                            quantity = {quantity} 
                            handleAddItemToCart = {handleAddItemToCart}
                            handleRemoveItemFromCart = {handleRemoveItemToCart} 
                            showDescription = {true} // productView displays only one product card, so its description should be rendered
                />
            </div>
        </div>
    )
}