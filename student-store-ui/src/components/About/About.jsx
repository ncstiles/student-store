import * as React from "react"
import "./About.css"
import aboutImg from './about-img.jpg'

export default function About() {
    return (
        <div id='about' className="about-wrapper">
            <div className='text'>
                <h1>About</h1>
                <div>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                    Veniam, voluptates a culpa voluptas nisi excepturi blanditiis 
                    magnam ipsum dolore eum, repellat, aliquid alias? Maxime maiores quaerat aliquam non, 
                    dignissimos blanditiis, excepturi tenetur cupiditate porro nisi explicabo 
                    quas unde fuga obcaecati debitis consequatur asperiores magnam cum illum accusantium corrupti perferendis veritatis.
                </div>
            </div>
            <div className='img-container' style={{backgroundImage: `url(${aboutImg})`}}/>
        </div>
    )
}