import * as React from "react"
import "./Hero.css"
import storeIcon from './store.png'

export default function Hero() {
    return (
        <div className="hero">
            <div className='intro'>
                <h1 id='welcome'>Welcome</h1>  
                <h1 className='extra-desc'>We're excited to have you here.</h1>
                <span>You're welcome to browse our selection of items.  When you're ready to checkout,
                    simply toggle the sidebar to enter in your contact information and we'll send your goodies
                    on their way. </span>
            </div>
            <div className='store-img-wrapper'>
                <img src={storeIcon} className='store-img' alt='store-img'/>
            </div>
        </div>
    )
}