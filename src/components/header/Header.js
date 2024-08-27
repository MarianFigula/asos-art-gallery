// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css"

export function Header () {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    {/* Add more links as needed */}
                </ul>
            </nav>
        </header>
    );
}
