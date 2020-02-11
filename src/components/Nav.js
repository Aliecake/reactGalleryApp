import React from 'react';
import { NavLink } from 'react-router-dom'
 
const Nav = (props) => {
        return (
            
            <nav className="main-nav">
                <ul>
                    {/*  requires a callback to not be called immediately (infinite loop) */}
                    <li><NavLink to="/search/trains" onClick={ props.navClicked }>Trains</NavLink></li>
                    <li><NavLink to="/search/cats" onClick={ props.navClicked } >Cats</NavLink></li>
                    <li><NavLink to="/search/dogs" onClick={ props.navClicked }>Dogs</NavLink></li>
                </ul>
            </nav>
    
        )

}


export default Nav;