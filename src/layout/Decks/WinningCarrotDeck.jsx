import React from "react";
import { getLength } from "../utils";
import { simpleUpdate, takeCard } from "../../_firebase/simpleCD";
import { DeckWithMenu } from "../../_components/DeckWithMenu";

const WinningCarrotDeck = ({ gameId, gameState }) => {
    const { smallCarrotDeck, winningCarrot } = gameState;

    function getWinningCarrot() {
        if (getLength(smallCarrotDeck) > 0) {
            const data = takeCard(gameId, gameState, "smallCarrotDeck");
            simpleUpdate(`${gameId}/gameState/`, "winningCarrot", data);
        }
    }

    return (
        <DeckWithMenu
            card={{ cardType: "Carrots" }}
            title={
                winningCarrot
                    ? getLength(smallCarrotDeck)
                        ? `${getLength(smallCarrotDeck)} Left`
                        : "Winner!"
                    : `Carrots for Winning`
            }
            actions={[
                {
                    actionTitle: "End Game",
                    handleClick: getWinningCarrot,
                },
            ]}
            picture={
                winningCarrot
                    ? `${winningCarrot[1].deck}/${winningCarrot[1].id}.png`
                    : `smallCarrot.png`
            }
        />
    );
};

export default WinningCarrotDeck;
