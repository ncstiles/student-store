import * as React from "react"
import "./CheckoutForm.css"
import PointOfSaleRoundedIcon from '@mui/icons-material/PointOfSaleRounded';

/**
 * Create HTML element with contents `text` and classnames `identifiers`
 * Add it to its parent HTML element `wrapperDiv`
 * 
 * @param {string} text the contents of this new element
 * @param {Array} identifiers classes to style this new element with
 * @param {HTMLDivElement} wrapperDiv the parent div to add the new element to
 */
function addTextTag(text, identifiers, wrapperDiv) {
    const tag = document.createElement('span')
    const tagText = document.createTextNode(text);
    tag.appendChild(tagText);
    identifiers.forEach(identifier => tag.classList.add(identifier));
    wrapperDiv.appendChild(tag);
}

export default function CheckoutForm({isOpen, orderReceipt, postSuccess, shoppingCart, setShoppingCart, checkoutForm, handleOnCheckoutFormChange, handleOnSubmitCheckoutForm}) {
    const orderStatus = document.getElementsByClassName('order-status')[0]
    const successMsg = 'Success! Your order has been placed.'
    const errorMsg = 'Error: Order did not go through.'

    /**
     * Complete POST request with order and purchaser data, then reset shopping cart and purchaser info
     * Add success/ error message under the order-status div
     */
     function checkoutSubmit() {
        handleOnSubmitCheckoutForm()
        if (postSuccess) {
            setShoppingCart([])
            handleOnCheckoutFormChange('', '')
            addTextTag(successMsg, ['success'], orderStatus) // add success message to the order-status div
        } 
        else {
            addTextTag(errorMsg, ['error'], orderStatus) // add error message to the order-status div
        }
    }
    
    /**
     * Upon update of name input element, update checkout form with new name value
     * @param {Event} e change in name input element
     */
    const changeUser = (e) => {
        handleOnCheckoutFormChange(e.target.value, checkoutForm.email)
        orderStatus.innerHTML = ''
    }

    /**
     * Upon update of email input element, update checkout form with new email value
     * @param {Event} e change in email input element
     */
    const changeEmail = (e) => {
        handleOnCheckoutFormChange(checkoutForm.user, e.target.value)
        orderStatus.innerHTML = ''
    }

    return (
        <div className="checkout-form">
            <div className='checkout-info'>
                <h2>Checkout</h2>
                <PointOfSaleRoundedIcon className='checkout-icon'/>
            </div> 
            
            <div className="email checkout-input-cols">
                <span>Email: </span>
                <input  className='checkout-form-input' 
                        type='email' 
                        name='email' 
                        placeholder="student@codepath.org" 
                        value={checkoutForm.email}
                        onChange={(e)=> changeEmail(e)} input/> 
            </div>

            <div className="name checkout-input-cols">
                <span>Name: </span>
                <input  className='checkout-form-input'
                        type='text'
                        name='name'
                        placeholder='Student Name'
                        value={checkoutForm.name}
                        onChange={(e)=> changeUser(e)} input/>
            </div>
           
            <button className='checkout-button' 
                    disabled={shoppingCart.length === 0 ? true : false} 
                    onClick={checkoutSubmit}>
                Checkout
            </button>

            <div id='order-status' className='order-status'>
                {orderReceipt.map(line => <><br/><br/><span className='success'>{line}</span></>)}
            </div>
        </div>      
    )
}