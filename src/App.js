import React, { useState } from "react";
import "./App.css";
// import Bingo from "./bingo/Bingo.tsx";
import { Container, Row } from "react-bootstrap";
import Player from "./killerBunnies/Player.tsx";
import {deckDefault, carrotDeckDefault} from "./killerBunnies/bluedeck";
import Cell from "./killerBunnies/Card.tsx"

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

function DisplayCardsList({ cards }) {
    return (
        <div>
            {cards.map((card) => (
                <div>{`ID: ${card.id}`}</div>
            ))}
        </div>
    );
}

function App() {
    const [deck, setDeck] = useState(shuffleArray(deckDefault));
    const [carrotDeck, setCarrotDeck] = useState(
        shuffleArray(carrotDeckDefault)
    );

    function removeTopCard() {
        setDeck(
            deck.filter((card, idx) => {
                if (idx !== 0) return card;
            })
        );
    }
    function takeCarrot() {
        setCarrotDeck(
            carrotDeck.filter((card, idx) => {
                if (idx !== 0) return card;
            })
        );
    }

    return (
        <Container>
            <Row>
                {/* <DisplayCardsList cards={deck} /> */}
                <Cell title={deck.length} />
                <Cell title={carrotDeck.length} color="orange" />
            </Row>
            <div style={{ padding: "1em" }}></div>
            <Row>
                <Player
                    deck={deck}
                    removeTopCard={removeTopCard}
                    carrotDeck={carrotDeck}
                    takeCarrot={takeCarrot}
                />
                <Player
                    deck={deck}
                    removeTopCard={removeTopCard}
                    carrotDeck={carrotDeck}
                    takeCarrot={takeCarrot}
                />
            </Row>
        </Container>
    );
}

export default App;
