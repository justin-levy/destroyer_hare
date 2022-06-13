import React, { useEffect, useState } from "react";
import "./App.css";
// import Bingo from "./bingo/Bingo.tsx";
import { Container, Row } from "react-bootstrap";
import Player from "./killerBunnies/Player.tsx";
import { deckDefault, carrotDeckDefault } from "./killerBunnies/bluedeck";
import Cell from "./killerBunnies/Card.tsx";

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

const initialGameState = {
    deck: [],
    carrotDeck: [],
    discardedDeck: [],
};

function App() {
    const [gameState, setGameState] = useState(initialGameState);

    useEffect(() => {
        setGameState({
            ...gameState,
            deck: shuffleArray(deckDefault),
            carrotDeck: shuffleArray(carrotDeckDefault),
        });
    }, []);

    function takeCard(pile) {
        setGameState({
            ...gameState,
            [pile]: gameState[pile].filter((card, idx) => {
                if (idx !== 0) return card;
            }),
        });
    }

    function discardCard(card) {
        setGameState({
            ...gameState,
            discardedDeck: [...gameState.discardedDeck, card],
        });
    }

    // console.log(gameState);

    return (
        <Container>
            <Row>
                {/* <DisplayCardsList cards={deck} /> */}
                <Cell
                    card={{ cardType: "Deck" }}
                    title={gameState.deck.length}
                    handleClick={() => console.log()}
                />
                <Cell
                    card={{ cardType: "Carrots" }}
                    title={gameState.carrotDeck.length}
                    color="orange"
                    handleClick={() => console.log()}
                />
            </Row>
            <div style={{ padding: "1em" }}></div>
            <Row>
                <Player
                    gameState={gameState}
                    takeCard={takeCard}
                    discardCard={discardCard}
                />
                {/* <Player gameState={gameState} takeCard={takeCard} /> */}
            </Row>
        </Container>
    );
}

export default App;
