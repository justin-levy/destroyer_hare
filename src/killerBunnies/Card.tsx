import React from "react";

function Cell({ card, idx, handleClick, color, title }) {
    return (
        <div
            className="card"
            key={idx}
            style={{ backgroundColor: color }}
            onClick={() => handleClick(card)}
        >
            {title}
        </div>
    );
}

export default Cell;
