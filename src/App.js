import React, { useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import Player from "./killerBunnies/Player";
import {
    deckDefault,
    carrotDeckDefault,
    marketStarterCard,
} from "./killerBunnies/bluedeck";
import { shuffleArray } from "./killerBunnies/utils";
import "./App.css";
import { GetAllData } from "./_firebase/getData";
import { simpleAdd } from "./_firebase/simpleCD";

const initialGameState = {
    deck: [],
    carrotDeck: [],
    discardedDeck: [],
    market: marketStarterCard,
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

    console.log(GetAllData());

    return (
        <Container>
            <Button
                onClick={() => {
                    simpleAdd(`12345/gameState`, { hello: "hello" });
                }}
            >
                Click
            </Button>
            <Row>
                <Player
                    gameState={gameState}
                    takeCard={takeCard}
                    discardCard={discardCard}
                    discardCarrotCard={discardCarrotCard}
                    setMarket={setMarket}
                />
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
