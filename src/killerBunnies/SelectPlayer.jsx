import React from "react";

const SelectPlayer = ({ setPlayerName }) => {
    return (
        <select onChange={(e) => setPlayerName(e.target.value)}>
            <option value="" defaultValue>
                Choose a Player!
            </option>
            <option value="Marie">Marie</option>
            <option value="Lizzie">Lizzie</option>
            <option value="Justin">Justin</option>
        </select>
    );
};

export default SelectPlayer;
