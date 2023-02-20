import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./App.css";
import { GetGameState, GetSelectedDecks } from "./_firebase/getData";

import Player from "./layout/Player";
import DeckToggle from "./layout/DeckToggle";
import Settings from "./layout/Settings";
import SelectPlayer from "./layout/SelectPlayer";

function App() {
    const gameId = "12345";
    const gameState = GetGameState(gameId);
    const gameDecks = GetSelectedDecks(gameId);
    const [playerName, setPlayerName] = useState("player1");

    return (
        <Container>
            <Row>
                <Col md={2}>
                    <Settings gameDecks={gameDecks} gameId={gameId} />
                    <div style={{ padding: ".5em" }} />
                    <SelectPlayer setPlayerName={setPlayerName} />
                    <div style={{ padding: ".5em" }} />
                    <DeckToggle gameDecks={gameDecks} gameId={gameId} />
                </Col>

                {gameState && playerName !== "player1" && (
                    <Player
                        gameId={gameId}
                        gameState={gameState}
                        playerName={playerName}
                    />
                )}
            </Row>
        </Container>
    );
}

export default App;
