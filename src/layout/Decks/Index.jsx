import React from "react";
import { Col, Row } from "react-bootstrap";

import { capitalizeFirstLetter, getLength } from "../utils";

import { PlayingCard } from "../../_components/PlayingCard";
import { DiscardDeck } from "./DiscardDeck";
import WinningCarrotDeck from "./WinningCarrotDeck";
import Market from "./Market";
import DrawingDeck from "./DrawingDeck";
import { simpleUpdate } from "../../_firebase/simpleCD";

const DeckLayout = ({
    gameId,
    gameState,
    playerState,
    playerName,
    currentPlayer,
    allPlayingCards,
}) => {
    const { discardedDeck, smallCarrotDeck, winningCarrot } = gameState;
    const { playingCard } = playerState;

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

    // function takeFromDiscardPile() {
    //     if (
    //         getLength(discardedDeck) > 0 &&
    //         getLength(hand) + getLength(run) <= 6
    //     ) {
    //         const data = takeCard("discardedDeck");
    //         simplePush(`${gameId}/${playerName}/hand/`, data[1]);
    //     }
    // }

    return (
        <Row>
            <Col>
                <PlayingCard
                    card={allPlayingCards[currentPlayer] || playingCard}
                    idx={0}
                    gameId={gameId}
                    deck="playing"
                    allowOptions={
                        playerName === capitalizeFirstLetter(currentPlayer)
                    }
                    gameState={gameState}
                    playerState={playerState}
                    playerName={playerName}
                />
                <div>Playing : {capitalizeFirstLetter(currentPlayer)}</div>
            </Col>
            <Col>
                <DrawingDeck
                    gameState={gameState}
                    playerState={playerState}
                    takeCard={takeCard}
                    gameId={gameId}
                    playerName={playerName}
                />
            </Col>
            <Col>
                <Market
                    playerName={playerName}
                    gameId={gameId}
                    takeCard={takeCard}
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
                <WinningCarrotDeck
                    winningCarrot={winningCarrot}
                    takeCard={takeCard}
                    smallCarrotDeck={smallCarrotDeck}
                    gameId={gameId}
                />
            </Col>
        </Row>
    );
};

export default DeckLayout;
