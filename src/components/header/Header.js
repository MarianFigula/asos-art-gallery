// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css"
import userIcon from "../../assets/icons/person.svg"
import listIcon from "../../assets/icons/list.svg"

export function Header () {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/"><h1>FEI Art Gallery</h1></Link></li>
                    <li><Link to="/login"><img src={userIcon} alt="User Icon"/></Link></li>
                    <li><Link to={"#"}><img src={listIcon} alt="Menu Icon"/></Link></li>
                    {/* Add more links as needed */}
                </ul>
            </nav>
        </header>
    );
}
