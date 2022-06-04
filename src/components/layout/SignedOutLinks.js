import React from 'react';
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
    return (
        <ul className="right">
            <li><NavLink to='/cookbooks/list'>Cookbooks</NavLink></li>
            <li><NavLink to='/recipes/list'>Recipes</NavLink></li>
            <li><NavLink to='/signin'>Login</NavLink></li>
            <li><NavLink to='/signup'>Sign Up</NavLink></li>
        </ul>
    )
}

export default SignedOutLinks