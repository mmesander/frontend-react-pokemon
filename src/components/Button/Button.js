import React from "react";
import './Button.css'


//Deze button verwacht een buttontype, een clickhandler, children (de tekst tussen de 2 ><) en of hij disabled is
function Button({buttonType, clickHandler, children, disabled}){
    return (
        <button
            className="button-nav"
            type={buttonType}
            onClick={clickHandler}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button;