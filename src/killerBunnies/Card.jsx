import React from "react";
import { Card, Col } from "react-bootstrap";

import { Menu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

export function DisplayCardsIcons({
    cards,
    basicFunctions,
    player = "",
    name,
    allowOptions = true,
}) {
    return (
        <>
            {cards &&
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
                ))}
        </>
    );
}

export function PlayingCard({
    card,
    idx,
    basicFunctions,
    player = "",
    deck,
    allowOptions = true,
}) {
    if (!card) return;

    const cardImg = card.id ? card.id : "0";

    const {
        addBunny,
        addDolla,
        addSpecial,
        discard,
        playRun,
        discardCarrot,
        changeMarket,
        addToBunny,
    } = basicFunctions;

    return (
        <>
            {allowOptions ? (
                <Menu
                    menuButton={
                        <Card>
                            <Card.Body className="p-1">
                                <Card.Img
                                    src={`blue/${cardImg}.png`}
                                ></Card.Img>
                            </Card.Body>
                        </Card>
                    }
                    transition
                >
                    {card.id !== 0 && (
                        <>
                            {card.type === "run" && deck === "hand" && (
                                <MenuItem onClick={() => playRun(idx, card)}>
                                    Run
                                </MenuItem>
                            )}
                            {card.type === "special" && deck === "hand" && (
                                <MenuItem onClick={() => playRun(idx, card)}>
                                    Run
                                </MenuItem>
                            )}
                            {card.type === "special" &&
                                deck !== "hand" &&
                                deck !== "special" && (
                                    <MenuItem
                                        onClick={() =>
                                            addSpecial(idx, card, deck)
                                        }
                                    >
                                        Add to Special Cards
                                    </MenuItem>
                                )}
                            {deck === "bunnies" && (
                                <MenuItem
                                    onClick={() => addToBunny(player, idx)}
                                >
                                    Add Playing Card to Bunny
                                </MenuItem>
                            )}
                            {card.kind === "market" && deck === "playing" && (
                                <MenuItem onClick={() => changeMarket(card)}>
                                    Change Market
                                </MenuItem>
                            )}
                            {card.type === "dolla" && deck !== "dolla" && (
                                <MenuItem
                                    onClick={() => addDolla(idx, card, deck)}
                                >
                                    Add Dolla
                                </MenuItem>
                            )}
                            {card.type === "verySpecial" &&
                                deck !== "special" && (
                                    <MenuItem
                                        onClick={() =>
                                            addSpecial(idx, card, deck)
                                        }
                                    >
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
                                <MenuItem
                                    onClick={() => discard(idx, card, deck)}
                                >
                                    Discard
                                </MenuItem>
                            )}

                            {card.kind === "carrotCard" &&
                                deck === "carrots" && (
                                    <MenuItem
                                        onClick={() =>
                                            discardCarrot(idx, card, deck)
                                        }
                                    >
                                        Discard Carrot
                                    </MenuItem>
                                )}
                        </>
                    )}
                </Menu>
            ) : (
                <Card>
                    <Card.Body className="p-1">
                        <Card.Img src={`blue/${cardImg}.png`}></Card.Img>
                    </Card.Body>
                </Card>
            )}
        </>
    );
}

export function Deck({ card, title, picture, actions, doubleClick }) {
    const handleMultiClicks = (e, card) => {
        switch (e.detail) {
            case 1:
                // console.log("click");
                break;
            case 2:
                doubleClick();
                break;
            case 3:
                // console.log("triple click");
                break;
            default:
                return;
        }
    };

    return (
        <>
            <Col>
                {actions ? (
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
                        {actions.map((action, idx) => (
                            <MenuItem
                                key={idx}
                                onClick={() => action.handleClick(card)}
                            >
                                {action.actionTitle}
                            </MenuItem>
                        ))}
                    </Menu>
                ) : (
                    <Card onClick={handleMultiClicks}>
                        <Card.Body className="p-1">
                            <Card.Img src={picture}></Card.Img>
                        </Card.Body>
                    </Card>
                )}
                <div style={{ textAlign: "left" }}>{title}</div>
            </Col>
        </>
    );
}
