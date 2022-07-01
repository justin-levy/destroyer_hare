import React, { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import Player from "./killerBunnies/Player";
import {
    deckDefault,
    carrotDeckDefault,
    marketStarterCard,
} from "./killerBunnies/bluedeck";
import { getLength, shuffleArray } from "./killerBunnies/utils";
import "./App.css";
import { GetGameState } from "./_firebase/getData";
import { simpleAdd, simpleUpdate } from "./_firebase/simpleCD";

const emptyPlayingCard = {
    id: 0,
};

function App() {
    const gameId = "12345";
    const gameState = GetGameState(gameId);
    const [playerName, setPlayerName] = useState("player1");
    const { discardedDeck } = gameState;

    const takeCard = (pile) => {
        let cardToTake = {};
        const deckSize = getLength(gameState[pile]);
        const updatedPile = Object.entries(gameState[pile]).filter(
            (card, idx) => {
                if (idx !== deckSize - 1) return card;
                else cardToTake = card;
            }
        );
        simpleUpdate(
            `${gameId}/gameState`,
            pile,
            Object.fromEntries(updatedPile)
        );
        return cardToTake;
    };

    function discardCard(card) {
        simpleAdd(
            `${gameId}/gameState/discardedDeck/${getLength(discardedDeck)}`,
            card
        );
    }

    function discardCarrotCard(card) {
        simpleAdd(
            `${gameId}/gameState/carrotDeck/${getLength(discardedDeck)}`,
            card
        );
    }

    function setMarket(card) {
        simpleUpdate(`${gameId}/gameState`, "market", card);
    }

    return (
        <Container>
            <Button
                onClick={() => {
                    simpleAdd(`${gameId}/gameState`, {
                        deck: shuffleArray(deckDefault),
                        carrotDeck: shuffleArray(carrotDeckDefault),
                        smallCarrotDeck: shuffleArray(carrotDeckDefault),
                        discardedDeck: [],
                        market: marketStarterCard,
                    });
                    simpleAdd(`${gameId}/Lizzie`, {
                        hand: [],
                        run: [],
                        dolla: [],
                        special: [],
                        bunnies: [],
                        carrots: [],
                        playingCard: emptyPlayingCard,
                    });
                    simpleAdd(`${gameId}/Marie`, {
                        hand: [],
                        run: [],
                        dolla: [],
                        special: [],
                        bunnies: [],
                        carrots: [],
                        playingCard: emptyPlayingCard,
                    });
                    simpleAdd(`${gameId}/Justin`, {
                        hand: [],
                        run: [],
                        dolla: [],
                        special: [],
                        bunnies: [],
                        carrots: [],
                        playingCard: emptyPlayingCard,
                    });
                }}
            >
                Start Game!
            </Button>
            <Row>
                <select onChange={(e) => setPlayerName(e.target.value)}>
                    <option value="Marie">Marie</option>
                    <option value="Lizzie">Lizzie</option>
                    <option value="Justin">Justin</option>
                </select>
            </Row>
            <Row>
                {playerName === "Lizzie" && gameState && gameState.deck && (
                    <Player
                        gameId={gameId}
                        gameState={gameState}
                        playerName={playerName}
                        takeCard={takeCard}
                        discardCard={discardCard}
                        discardCarrotCard={discardCarrotCard}
                        setMarket={setMarket}
                    />
                )}
                {playerName === "Marie" && gameState && gameState.deck && (
                    <Player
                        gameId={gameId}
                        gameState={gameState}
                        playerName={playerName}
                        takeCard={takeCard}
                        discardCard={discardCard}
                        discardCarrotCard={discardCarrotCard}
                        setMarket={setMarket}
                    />
                )}
                {playerName === "Justin" && gameState && gameState.deck && (
                    <Player
                        gameId={gameId}
                        gameState={gameState}
                        playerName={playerName}
                        takeCard={takeCard}
                        discardCard={discardCard}
                        discardCarrotCard={discardCarrotCard}
                        setMarket={setMarket}
                    />
                )}
            </Row>
        </Container>
    );
}

export default App;
