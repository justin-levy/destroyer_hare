import React from "react";
import { Card } from "react-bootstrap";

import { Menu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

export function PlayingCard({
    card,
    idx,
    handleClick,
    color,
    title,
    basicFunctions,
    deck,
}) {
    const cardImg = card.id ? card.id : "1";

    const { addBunny, addDolla, discard, playRun } = basicFunctions;

    return (
        <>
            <Menu
                menuButton={
                    <Card>
                        <Card.Body className="p-1">
                            {/* <Card.Title className="text-right padding-0">
                                {card.cardType.toUpperCase()} {card.id}
                            </Card.Title> */}
                            <Card.Img src={`/blue/${cardImg}.png`}></Card.Img>
                        </Card.Body>
                    </Card>
                }
                transition
            >
                {card.cardType === "run" && deck === "hand" && (
                    <MenuItem onClick={() => playRun(card)}>Run</MenuItem>
                )}
                {card.type === "dolla" && (
                    <MenuItem onClick={() => addDolla(card, deck)}>
                        Add Dolla
                    </MenuItem>
                )}
                {card.type === "bunny" && deck != "hand" && (
                    <MenuItem onClick={() => addBunny(card)}>
                        Add Bunny
                    </MenuItem>
                )}
                <MenuItem onClick={() => discard(card, deck)}>Discard</MenuItem>
            </Menu>
        </>
    );
}

export function Deck({ card, idx, handleClick, color, title, basicFunctions }) {
    const cardImg = card.id ? card.id : "1";

    return (
        <>
            <Menu
                menuButton={
                    <Card>
                        <Card.Body className="p-1">
                            {/* <Card.Title className="text-right padding-0">
                                {card.cardType.toUpperCase()} {card.id}
                            </Card.Title> */}
                            <Card.Img src={`/blue/${cardImg}.png`}></Card.Img>
                        </Card.Body>
                    </Card>
                }
                transition
            >
                {/* <MenuItem>Run</MenuItem>
                <MenuItem>Discard</MenuItem> */}
                <MenuItem onClick={() => addDolla(card)}>Add Dolla</MenuItem>
            </Menu>
        </>
    );
}
