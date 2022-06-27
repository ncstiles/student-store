import * as React from "react"
import "./Logo.css"
import {Link}  from "react-router-dom"
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

export default function Logo() {
  return (
    <div className='logo logoClass'>
        <Link to='/' >
          <HomeRoundedIcon className='homeLink'/>
        </Link>
    </div>
  )
}