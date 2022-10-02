import React from "react";
import { PlayingCard } from "./PlayingCard";

export function DisplayCardsIcons({
    cards,
    gameId,
    player = "",
    name,
    allowOptions = true,
    playerName = "",
}) {
    return (
        <>
            {cards &&
                Object.entries(cards).map((card) => (
                    <PlayingCard
                        card={card[1]}
                        idx={card[0]}
                        key={card[0]}
                        gameId={gameId}
                        player={player}
                        playerName={playerName}
                        title={card[1].name}
                        deck={name}
                        allowOptions={allowOptions}
                    />
                ))}
        </>
    );
}
