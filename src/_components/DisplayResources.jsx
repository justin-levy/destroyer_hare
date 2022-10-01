import React from "react";
import { ResourceCard } from "./ResourceCard";

export function DisplayResources({ cabbage, water, player }) {
    return (
        <>
            {cabbage &&
                Object.entries(cabbage).map((card) => (
                    <ResourceCard
                        card={card[1]}
                        type={"cabbage"}
                        player={player}
                        id={card[0]}
                    />
                ))}
            {water &&
                Object.entries(water).map((card) => (
                    <ResourceCard
                        card={card[1]}
                        type={"water"}
                        player={player}
                        id={card[0]}
                    />
                ))}
            {/* {cards &&
                Object.entries(cards).map((card) => (
                    <PlayingCard
                        card={card[1]}
                        idx={card[0]}
                        key={card[0]}
                        basicFunctions={basicFunctions}
                        player={player}
                        title={card[1].name}
                        deck={name}
                        allowOptions={allowOptions}
                    />
                ))} */}
        </>
    );
}
