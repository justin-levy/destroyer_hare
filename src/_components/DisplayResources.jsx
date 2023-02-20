import React from "react";
import ResourceCard from "./ResourceCard";

export function DisplayResources({ cabbage, water, player, gameId }) {
    return (
        <>
            {cabbage &&
                Object.entries(cabbage).map((card) => (
                    <ResourceCard
                        card={card[1]}
                        type={"cabbage"}
                        player={player}
                        id={card[0]}
                        gameId={gameId}
                    />
                ))}
            {water &&
                Object.entries(water).map((card) => (
                    <ResourceCard
                        card={card[1]}
                        type={"water"}
                        player={player}
                        id={card[0]}
                        gameId={gameId}
                    />
                ))}
        </>
    );
}
