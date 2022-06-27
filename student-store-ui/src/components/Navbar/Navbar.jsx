import * as React from "react"
import "./Navbar.css"
import Logo from '../Logo/Logo'

export default function Navbar() {
  return (
    <nav id='navbar' className="navbar" >
      <div className='navbar-contents'>
        <Logo />
        <div className='page-links'>
          <a href='/#home-top'><span className='nav-text'>Home</span></a>
          <a href='/#about'><span className='nav-text'>About</span></a>
          <a href='/#contact'><span className='nav-text'>Contact</span></a>
          <a href='/#content-top'><span className='nav-text'>Browse</span></a>
        </div>
      </div>
    </nav>   
  )
}