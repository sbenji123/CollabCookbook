import React from 'react';
import { NavLink } from 'react-router-dom'

const SignedInLinks = () => {
    return (
        <ul className="right">
            <li><NavLink to='/'>Cookbooks</NavLink></li>
            <li><NavLink to='/recipe/list'>Recipes</NavLink></li>
            <li><NavLink to='/'>Log Out</NavLink></li>
            <li><NavLink to='/' className='btn btn-floating pink lighten-1'>SB</NavLink></li>
        </ul>
    )
}

export default SignedInLinks