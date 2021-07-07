import React from 'react'
import { NavLink } from 'react-router-dom'
function Navbar() {
    return (
        <div>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/shop">Shop</NavLink>
            <NavLink to="/bag">Bag</NavLink>
            
        </div>
    )
}

export default Navbar
