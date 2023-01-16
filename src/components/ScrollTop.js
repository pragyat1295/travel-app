import React from "react";
import { useState, useEffect } from "react";
import '../styles/home.css';
// import theme from "../styles/theme";


const ScrollTop = () => {

    const [showTop, setShowTop] = useState(false);

    useEffect (() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 1) {
                setShowTop(true);
            }
            else {
                setShowTop(false);
            }
        });
    });

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className = 'topToBtm'>
            {/* {" "} */}

            {showTop && (
                <div className='center icon-position icon-style' >
                    <button  style = {{color: 'white', fontWeight: '500', fontSize: '4vh'}} onClick = {goToTop}> ^ </button>
                </div>
            )} 
            
        </div>
    );

};

export default ScrollTop;