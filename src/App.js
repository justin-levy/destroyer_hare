import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Player from "./killerBunnies/Player.tsx";
import {
    deckDefault,
    carrotDeckDefault,
    marketStarterCard,
} from "./killerBunnies/bluedeck";
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
    market: marketStarterCard,
    numberOfPlayers: 2,
};

function App() {
    const [gameState, setGameState] = useState(initialGameState);

    useEffect(() => {
        setGameState({
            ...gameState,
            deck: shuffleArray(deckDefault),
            carrotDeck: shuffleArray(carrotDeckDefault),
            smallCarrotDeck: shuffleArray(carrotDeckDefault),
        });
    }, []);

    useEffect(() => {
        console.log(gameState);
    }, [gameState]);

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
            discardedDeck: [card, ...gameState.discardedDeck],
        });
    }

    function discardCarrotCard(card) {
        setGameState({
            ...gameState,
            carrotDeck: [...gameState.carrotDeck, card],
        });
    }

    function setMarket(card) {
        setGameState({
            ...gameState,
            market: card,
        });
    }

    function setNumPlayers(num) {
        setGameState({
            ...gameState,
            numberOfPlayers: num,
        });
    }

    return (
        <Container>
            <Row>
                <select
                    title="How many players?"
                    onChange={(e) => setNumPlayers(e.target.value)}
                >
                    <option value="2" defaultValue={true}>
                        2
                    </option>
                    <option value="3">3</option>
                </select>
                {
                    // Game Master
                }
                {/* <DisplayCardsList cards={deck} /> */}
            </Row>

            <Row>
                <Player
                    gameState={gameState}
                    takeCard={takeCard}
                    discardCard={discardCard}
                    discardCarrotCard={discardCarrotCard}
                    setMarket={setMarket}
                />
            </Row>
        </Container>
    );
}

export default App;
