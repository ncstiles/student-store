import * as React from "react"
import "./ProductGrid.css"
import ProductCard from '../ProductCard/ProductCard'
import NotFound from "../NotFound/NotFound"

export default function ProductGrid({products, filteredProducts, searchResults, shoppingCart, handleAddItemToCart, handleRemoveItemToCart}) {
    return (
        <div className='product-grid'>
            <h1 className='product-intro'>Our Popular Items</h1>
            {
                searchResults.length !== 0 ?
                    <div className="products">
                        {searchResults.map(product => {
                            const sameItem = shoppingCart.find(cartItem => cartItem.itemId === product.id)
                            const quantity = sameItem?.quantity || 0
                            return  <ProductCard key={product.id} 
                                                product={product} 
                                                productId={product.id}
                                                quantity={quantity}
                                                handleAddItemToCart={handleAddItemToCart}
                                                showDescription={false} //cards here are part of productGrid, so don't render product description
                                                handleRemoveItemFromCart = {handleRemoveItemToCart}
                                    />
                        })}
                    </div>
                    :
                    <NotFound/>
            }
        </div>
    )
}