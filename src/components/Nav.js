import React from 'react';
import { NavLink } from 'react-router-dom'
 
const Nav = (props) => {

    return (

        <nav className="main-nav">
            <ul>
                {/*  requires a callback to not be called immediately (infinite loop) */}
                <li><NavLink to={`/search/coding-memes`} onClick={() => props.displayResults(`meme`)}>Memes</NavLink></li>
                <li><NavLink to="/search/cats" onClick={() => props.displayResults(`cat`)}>Cats</NavLink></li>
                <li><NavLink to="/search/ferrets" onClick={() => props.displayResults(`dog`)}>Dogs</NavLink></li>
            </ul>
        </nav>

    )
}


export default Nav;