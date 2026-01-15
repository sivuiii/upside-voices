import React from "react";
import "./GlitchButton.css";

export default function GlitchButton({ children, onClick, className = "" }) {
    return (
        <button className={`glitch-btn ${className}`} onClick={onClick}>
            {children}
        </button>
    );
}
