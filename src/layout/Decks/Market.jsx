import React from "react";
import { simplePush, takeCard } from "../../_firebase/simpleCD";
import { getLength } from "../utils";
import { DeckWithMenu } from "../../_components/DeckWithMenu";

const Market = ({ gameId, gameState, playerName }) => {
    const { carrotDeck, cabbageDeck, waterDeck } = gameState;

    function drawCarrot() {
        if (getLength(carrotDeck) > 0) {
            const data = takeCard(gameId, gameState, "carrotDeck");
            simplePush(`${gameId}/${playerName}/carrots/`, data[1]);
        }
    }

    function drawCabbage() {
        if (getLength(cabbageDeck) > 0) {
            const data = takeCard(gameId, gameState, "cabbageDeck");
            simplePush(`${gameId}/${playerName}/cabbage/`, data[1]);
        }
    }

    function drawWater() {
        if (getLength(waterDeck) > 0) {
            const data = takeCard(gameId, gameState, "waterDeck");
            simplePush(`${gameId}/${playerName}/water/`, data[1]);
        }
    }

    return (
        <DeckWithMenu
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
