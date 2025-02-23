import React from "react";
import "../styles/navbar.css";
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
            <div className="navbar-container">
                
                {/* Logo */}
                <div className="navbar-logo">
                        PowerPrompt
                </div>

                {/* Desktop Links */}
                <div className="navbar-links">
                    <Link to="/home" className="navbar-link">
                        HOME
                    </Link>

                    <Link to="/impact" className="navbar-link">
                        IMPACT
                    </Link>

                    {/* <Link to="/gallery" className="navbar-link">
                        GALLERY
                    </Link> */}

                    {/* <a href="#contact" className="navbar-link">
                        PROMPT ENGINEERING
                    </a> */}
                </div>

            </div>
    );
}