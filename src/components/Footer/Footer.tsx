import React from "react";
import '../Footer/Footer.css'
export const Footer = () => {
    const d = new Date();
    return (
        <>
            <footer>
                <p>© {d.getFullYear()} by ABC. All rights reversed. </p>
            </footer>
        </>
    )
}