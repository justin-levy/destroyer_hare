import React from "react";
import { Deck } from "../_components/Deck";
import { getLength } from "../killerBunnies/utils";
import { simpleUpdate } from "../_firebase/simpleCD";

const WinningCarrotDeck = ({
    winningCarrot,
    takeCard,
    smallCarrotDeck,
    gameId,
}) => {
    function getWinningCarrot() {
        if (getLength(smallCarrotDeck) > 0) {
            const data = takeCard("smallCarrotDeck");
            simpleUpdate(`${gameId}/gameState/`, "winningCarrot", data);
        }
    }

    return (
        <Deck
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
