import React from "react";
import { Col, Row } from "react-bootstrap";
import Footer from "../_components/Footer";
import { GetPlayerState, GetPlayingCards } from "../_firebase/getData";

import DeckLayout from "./Decks/Index";
import BunnyCircleLayout from "./BunnyCircle/Index";
import Hand from "./Hand/Index";

function Player({ gameId, gameState, playerName }) {
    const playerState = GetPlayerState(gameId, playerName);
    if (!playerState) return;

    const allPlayingCards = GetPlayingCards(gameId);

    const currentPlayer = allPlayingCards.lizzie.id
        ? "lizzie"
        : allPlayingCards.marie.id
        ? "marie"
        : allPlayingCards.justin.id
        ? "justin"
        : "";

    return (
        <>
            <Col md={10}>
                <DeckLayout
                    gameId={gameId}
                    gameState={gameState}
                    playerState={playerState}
                    playerName={playerName}
                    currentPlayer={currentPlayer}
                    allPlayingCards={allPlayingCards}
                />
            </Col>
            <div style={{ padding: ".5em" }}></div>
            <Col md={12} style={{ backgroundColor: "lightgrey" }}>
                <Row>
                    <BunnyCircleLayout
                        gameId={gameId}
                        playerName={playerName}
                        gameState={gameState}
                        playerState={playerState}
                    />
                </Row>
            </Col>
            <div style={{ padding: ".5em" }}></div>

            <Footer>
                <Hand
                    gameId={gameId}
                    playerName={playerName}
                    playerState={playerState}
                    currentPlayer={currentPlayer}
                    gameState={gameState}
                />
            </Footer>
        </>
    );
}

export default Player;
