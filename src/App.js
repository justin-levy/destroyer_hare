import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { getLength } from "./killerBunnies/utils";
import "./App.css";
import { GetGameState, GetSelectedDecks } from "./_firebase/getData";
import { simpleAdd, simplePush, simpleUpdate } from "./_firebase/simpleCD";

import Player from "./killerBunnies/Player";
import DeckToggle from "./killerBunnies/DeckToggle";
import Settings from "./killerBunnies/Settings";
import SelectPlayer from "./killerBunnies/SelectPlayer";

function App() {
    const gameId = "12345";
    const gameState = GetGameState(gameId);
    const gameDecks = GetSelectedDecks(gameId);
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
        simplePush(`${gameId}/gameState/discardedDeck/`, card);
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
            <Row>
                <Col md={2}>
                    <Settings gameDecks={gameDecks} gameId={gameId} />
                    <div style={{ padding: ".5em" }} />
                    <SelectPlayer setPlayerName={setPlayerName} />
                    <div style={{ padding: ".5em" }} />
                    <DeckToggle gameDecks={gameDecks} />
                </Col>

                {playerName === "Lizzie" && gameState && (
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
                {playerName === "Marie" && gameState && (
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
                {playerName === "Justin" && gameState && (
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
