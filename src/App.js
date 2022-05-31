import React, { useState } from "react";
import "./App.css";

function Cell({ text, idx }) {
    const [clicked, setClicked] = useState(false);
    return (
        <div
            className="cell"
            key={idx}
            style={{ backgroundColor: `${clicked ? "blue" : "white"}` }}
            onClick={() => setClicked(!clicked)}
        >
            {text}
        </div>
    );
}

function App() {
    const [textBox, setTextBox] = useState("");

    function shuffleArray(array) {
        let i = array.length - 1;
        for (i; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    return (
        <div>
            <input
                type="text"
                value={textBox}
                onChange={(e) => setTextBox(e.target.value)}
                style={{ height: "100px" }}
            />
            <div>
                {shuffleArray(textBox.split(" ")).map((text, idx) => (
                    <Cell text={text} idx={idx} />
                ))}
            </div>
        </div>
    );
}

export default App;
