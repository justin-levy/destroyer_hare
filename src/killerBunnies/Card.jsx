import React from "react";
import { Card, Col } from "react-bootstrap";

import { Menu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

export function DisplayCardsList({ cards }) {
    return (
        <div>
            {cards.map((card) => (
                <div>{`ID: ${card.id}`}</div>
            ))}
        </div>
    );
}

export function PlayingCard({ card, idx, basicFunctions, deck }) {
    const cardImg = card.id ? card.id : "1";

    const {
        addBunny,
        addDolla,
        addSpecial,
        discard,
        playRun,
        discardCarrot,
        changeMarket,
    } = basicFunctions;

    return (
        <>
            <Menu
                menuButton={
                    <Card>
                        <Card.Body className="p-1">
                            <Card.Img src={`/blue/${cardImg}.png`}></Card.Img>
                        </Card.Body>
                    </Card>
                }
                transition
            >
                {card.type === "run" && deck === "hand" && (
                    <MenuItem onClick={() => playRun(idx, card)}>Run</MenuItem>
                )}
                {card.type === "special" && deck === "hand" && (
                    <MenuItem onClick={() => playRun(idx, card)}>Run</MenuItem>
                )}
                {card.type === "special" &&
                    deck !== "hand" &&
                    deck != "special" && (
                        <MenuItem onClick={() => addSpecial(idx, card, deck)}>
                            Add to Special Cards
                        </MenuItem>
                    )}
                {card.kind === "market" && deck === "playing" && (
                    <MenuItem onClick={() => changeMarket(card)}>
                        Change Market
                    </MenuItem>
                )}
                {card.type === "dolla" && deck !== "dolla" && (
                    <MenuItem onClick={() => addDolla(idx, card, deck)}>
                        Add Dolla
                    </MenuItem>
                )}
                {card.type === "verySpecial" && deck !== "special" && (
                    <MenuItem onClick={() => addSpecial(idx, card, deck)}>
                        Add to Special Cards
                    </MenuItem>
                )}
                {card.kind === "bunny" &&
                    deck !== "hand" &&
                    deck !== "bunnies" && (
                        <MenuItem onClick={() => addBunny(card)}>
                            Add Bunny
                        </MenuItem>
                    )}
                {card.kind !== "carrotCard" && (
                    <MenuItem onClick={() => discard(idx, card, deck)}>
                        Discard
                    </MenuItem>
                )}

                {card.kind === "carrotCard" && deck === "carrots" && (
                    <MenuItem onClick={() => discardCarrot(idx, card, deck)}>
                        Discard Carrot
                    </MenuItem>
                )}
            </Menu>
        </>
    );
}

export function Deck({ card, handleClick, title, actionTitle, picture }) {
    const handleMultiClicks = (e, card) => {
        switch (e.detail) {
            case 1:
                console.log("click");
                break;
            case 2:
                console.log("double click");
                break;
            case 3:
                console.log("triple click");
                break;
            default:
                return;
        }
    };

    return (
        <>
            <Col>
                <div style={{ textAlign: "left" }}>{title}</div>
                <Menu
                    menuButton={
                        <Card>
                            <Card.Body className="p-1">
                                <Card.Img src={picture}></Card.Img>
                            </Card.Body>
                        </Card>
                    }
                    transition
                >
                    <MenuItem onClick={() => handleClick(card)}>
                        {actionTitle}
                    </MenuItem>
                </Menu>
            </Col>
        </>
    );
}
