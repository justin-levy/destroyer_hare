import React from "react";
import { Card } from "react-bootstrap";
import { simplePush, takeCard } from "../../_firebase/simpleCD";
import { getLength } from "../utils";

const DrawingDeck = ({ gameState, playerState, gameId, playerName }) => {
    const { deck } = gameState;
    const { hand, run } = playerState;

    function draw() {
        if (getLength(deck) > 0 && getLength(hand) + getLength(run) <= 6) {
            const data = takeCard(gameId, gameState, "deck");
            simplePush(`${gameId}/${playerName}/hand/`, data[1]);
        }
    }

    const handleMultiClicks = (e) => {
        switch (e.detail) {
            case 1:
                break;
            case 2:
                draw();
                break;
            default:
                return;
        }
    };

    return (
        <>
            <Card onClick={handleMultiClicks}>
                <Card.Body className="p-1">
                    <Card.Img
                        src={`${
                            Object.entries(gameState.deck)[
                                getLength(gameState.deck) - 1
                            ][1].deck
                        }.png`}
                    />
                </Card.Body>
            </Card>

            <div style={{ textAlign: "left" }}>{`Deck : ${getLength(
                gameState.deck
            )} Cards`}</div>
        </>
    );
};

export default DrawingDeck;
