import React from "react";
import { simplePush } from "../../_firebase/simpleCD";
import { getLength } from "../utils";
import { Deck } from "../../_components/Deck";

const DrawingDeck = ({
    gameState,
    playerState,
    takeCard,
    gameId,
    playerName,
}) => {
    const { deck } = gameState;
    const { hand, run } = playerState;

    function draw() {
        if (getLength(deck) > 0 && getLength(hand) + getLength(run) <= 6) {
            const data = takeCard("deck");
            simplePush(`${gameId}/${playerName}/hand/`, data[1]);
        }
    }

    return (
        <Deck
            card={{ cardType: "Deck" }}
            title={`Deck : ${getLength(gameState.deck)} Cards`}
            // actions={[{ actionTitle: "Draw", handleClick: draw }]}
            doubleClick={() => draw()}
            picture={`${
                Object.entries(gameState.deck)[getLength(gameState.deck) - 1][1]
                    .deck
            }.png`}
        />
    );
};

export default DrawingDeck;
