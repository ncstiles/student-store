import * as React from "react"
import "./ShoppingCart.css"
import { round } from "../App/App"
import LocalGroceryStoreRoundedIcon from '@mui/icons-material/LocalGroceryStoreRounded';

export default function ShoppingCart({isOpen, products, shoppingCart}) {
    let total = 0
    const taxRate = 0.0875

    /**
     * @param {Number} cartItemId id of a product in the cart
     * @returns the name of the produt whose id is `cartItemId`
     */
    const idToName = (cartItemId) => {
        return products.find(product => product.id === cartItemId).name
    }

    /**
     * @param {object} cartItem a product object with fields itemId (number) and quantity (number)
     * @returns the price of the product `cartItem`
     */
    const calcUnitPrice = (cartItem) => {
        return products.find(product => product.id === cartItem.itemId).price
    }

    /**
     * 
     * @param {Array} cartItems array of product objects, where each item has fields itemId (number) and quantity (number)
     * @returns the total price of all items in the cart
     */
    const calcTotalCost = (cartItems) => {
        cartItems.map(cartItem => {
            total += cartItem.quantity * calcUnitPrice(cartItem)
        })
        return total
    }

    // Render an "empty cart" message if no items are in the cart
    if (shoppingCart.length === 0) {
        return (
            <>
                <div className="cart-info">
                    <h2>Shopping Cart</h2>
                    <LocalGroceryStoreRoundedIcon className='cart-icon'/>
                </div>
                <span className='notification'>
                    No items added to cart yet. Start shopping now!
                </span>
            </>
        )
    }
    else {
        // Render 2 tables: (1) line items of products in cart, (2) running subtotal, sales tax, and total values
        return ( 
        <div className='shopping-cart'>
            <div className="cart-info">
                <h2>Shopping Cart</h2>
                <LocalGroceryStoreRoundedIcon className='cart-icon'/>
            </div>
            
            <div className="order-table">
                <div className='table-header order-four-cols'>
                    <h4>Name</h4>
                    <h4>Quantity</h4>
                    <h4>Unit Price</h4>
                    <h4>Cost</h4>
                </div>
                {
                    shoppingCart.map(cartItem => {
                        return <div className='item-and-quantity order-four-cols' key={cartItem.itemId}>
                            <>
                                <span className='cart-product-name'>{idToName(cartItem.itemId)}</span>
                                <span className='cart-product-quantity'>{cartItem.quantity}</span>
                                <span className='cart-product-unit-price'>${round(calcUnitPrice(cartItem))}</span>
                                <span className='cart-product-cost'>${round(cartItem.quantity*calcUnitPrice(cartItem))}</span>
                            </>
                        </div>
                    })
                }
            </div>
            
            <div className="subtotal-three-rows">
                <div className="subtotal shopping-cols">
                    <h4 className="category">Subtotal</h4>
                    <h4 className="price">${round(calcTotalCost(shoppingCart))}</h4>
                </div>
                <div className="sales-tax shopping-cols">
                    <h4 className="category">Sales Tax</h4>
                    <h4 className="price">${round(total*taxRate)}</h4>
                </div>
                <div className="total-price shopping-cols">
                    <h4 className="category">Total</h4>
                    <h4 className="price">${round(total*(1+taxRate))}</h4>
                </div>
            </div>  
        </div>
    )}
}