import React from 'react';
import {Link} from "react-router-dom";

const Nav = () => {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/">Weather App</Link>
                </li>
                <li>
                    <Link to="/popular">Popular Display</Link>
                </li>
            </ul>
        </div>
    );
};

export default Nav;
