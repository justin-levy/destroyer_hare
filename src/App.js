import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Player from "./killerBunnies/Player.tsx";
import { deckDefault, carrotDeckDefault } from "./killerBunnies/bluedeck";
import { Deck } from "./killerBunnies/Card.tsx";
import { shuffleArray } from "./killerBunnies/utils";

import "./App.css";

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
                <Deck
                    card={{ cardType: "Deck" }}
                    title={gameState.deck.length}
                    handleClick={() => console.log()}
                />
                <Deck
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
