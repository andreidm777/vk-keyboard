import React from "react";

import './style.scss'

const Buttons = ({children}:{ children: any }) => {
    return (
        <div className="Buttons">
            {children}
        </div>
    );
}

export default Buttons;