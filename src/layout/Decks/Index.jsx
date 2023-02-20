import React from "react";
import { Col, Row } from "react-bootstrap";

import { capitalizeFirstLetter } from "../utils";

import { PlayingDeck } from "./PlayingDeck";
import { DiscardDeck } from "./DiscardDeck";
import WinningCarrotDeck from "./WinningCarrotDeck";
import Market from "./Market";
import DrawingDeck from "./DrawingDeck";

const DeckLayout = ({
    gameId,
    gameState,
    playerState,
    playerName,
    currentPlayer,
    allPlayingCards,
}) => {
    const { discardedDeck } = gameState;
    const { playingCard } = playerState;

    return (
        <Row>
            <Col>
                <PlayingDeck
                    card={allPlayingCards[currentPlayer] || playingCard}
                    idx={0}
                    gameId={gameId}
                    allowOptions={
                        playerName === capitalizeFirstLetter(currentPlayer)
                    }
                    playerName={playerName}
                    player={capitalizeFirstLetter(currentPlayer)}
                />
                <div>Playing : {capitalizeFirstLetter(currentPlayer)}</div>
            </Col>
            <Col>
                <DrawingDeck
                    gameState={gameState}
                    playerState={playerState}
                    gameId={gameId}
                    playerName={playerName}
                />
            </Col>
            <Col>
                <Market
                    playerName={playerName}
                    gameId={gameId}
                    gameState={gameState}
                />
            </Col>
            <Col>
                <DiscardDeck
                    deck={discardedDeck}
                    playerName={playerName}
                    gameId={gameId}
                    currentPlayer={currentPlayer}
                    playingCard={playingCard}
                />
            </Col>
            <Col>
                <WinningCarrotDeck gameId={gameId} gameState={gameState} />
            </Col>
        </Row>
    );
};

export default DeckLayout;
