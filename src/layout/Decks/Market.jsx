import React from "react";
import { simplePush } from "../../_firebase/simpleCD";
import { getLength } from "../utils";
import { Deck } from "../../_components/Deck";

const Market = ({ gameState, takeCard, playerName, gameId }) => {
    const { carrotDeck, cabbageDeck, waterDeck } = gameState;

    function drawCarrot() {
        if (getLength(carrotDeck) > 0) {
            const data = takeCard("carrotDeck");
            simplePush(`${gameId}/${playerName}/carrots/`, data[1]);
        }
    }

    function drawCabbage() {
        if (getLength(cabbageDeck) > 0) {
            const data = takeCard("cabbageDeck");
            simplePush(`${gameId}/${playerName}/cabbage/`, data[1]);
        }
    }

    function drawWater() {
        if (getLength(waterDeck) > 0) {
            const data = takeCard("waterDeck");
            simplePush(`${gameId}/${playerName}/water/`, data[1]);
        }
    }

    return (
        <Deck
            card={{ cardType: "Market" }}
            title={`Market`}
            actions={[
                {
                    actionTitle: `Cabbage Card (${getLength(
                        gameState.cabbageDeck
                    )} Left)`,
                    handleClick: drawCabbage,
                },
                {
                    actionTitle: `Water Card (${getLength(
                        gameState.waterDeck
                    )} Left)`,
                    handleClick: drawWater,
                },
                {
                    actionTitle: `Carrot (${getLength(
                        gameState.carrotDeck
                    )} Left)`,
                    handleClick: drawCarrot,
                },
            ]}
            picture={`${gameState.market.deck}/${gameState.market.id}.png`}
        />
    );
};

export default Market;
