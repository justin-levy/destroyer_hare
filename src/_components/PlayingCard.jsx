import React from "react";
import { Card, Carousel } from "react-bootstrap";

import { Menu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { simpleDelete } from "../_firebase/simpleCD";

export function PlayingCard({
    card,
    idx,
    basicFunctions,
    player = "",
    deck,
    allowOptions = true,
    playerName = "",
}) {
    if (!card) return;

    const cardImg = card.id ? card.id : "0";
    const modifiers = card.modifiers;

    // console.log(modifiers);

    const {
        addBunny,
        addDolla,
        addSpecial,
        discard,
        discardCard,
        playRun,
        discardCarrot,
        changeMarket,
        addToBunny,
    } = basicFunctions;

    return (
        <>
            <Carousel
                nextLabel=""
                prevLabel=""
                style={{ width: "145px" }}
                indicators={modifiers !== undefined}
                controls={modifiers !== undefined}
            >
                {modifiers &&
                    Object.entries(modifiers).map((modifier) => (
                        <Carousel.Item key={modifier[0]}>
                            <Menu
                                menuButton={
                                    <Card>
                                        <Card.Body className="p-1">
                                            <Card.Img
                                                src={`${modifier[1].deck}/${modifier[1].id}.png`}
                                            ></Card.Img>
                                        </Card.Body>
                                    </Card>
                                }
                                transition
                            >
                                <MenuItem
                                    onClick={() => {
                                        discardCard(modifier[1]);
                                        simpleDelete(
                                            `12345/${player}/bunnies/${idx}/modifiers/${modifier[0]}`
                                        );
                                    }}
                                >
                                    Discard
                                </MenuItem>
                            </Menu>
                        </Carousel.Item>
                    ))}
                <Carousel.Item>
                    {allowOptions ? (
                        <Menu
                            menuButton={
                                <Card>
                                    <Card.Body className="p-1">
                                        <Card.Img
                                            src={`${card.deck}/${cardImg}.png`}
                                        ></Card.Img>
                                    </Card.Body>
                                </Card>
                            }
                            transition
                        >
                            {card.id !== 0 && (
                                <>
                                    {card.type === "run" && deck === "hand" && (
                                        <MenuItem
                                            onClick={() => playRun(idx, card)}
                                        >
                                            Run
                                        </MenuItem>
                                    )}
                                    {card.type === "special" &&
                                        deck === "hand" && (
                                            <MenuItem
                                                onClick={() =>
                                                    playRun(idx, card)
                                                }
                                            >
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
                                            onClick={() =>
                                                addToBunny(player, idx)
                                            }
                                        >
                                            Add Playing Card to Bunny
                                        </MenuItem>
                                    )}
                                    {card.kind === "market" &&
                                        deck === "playing" && (
                                            <MenuItem
                                                onClick={() =>
                                                    changeMarket(card)
                                                }
                                            >
                                                Change Market
                                            </MenuItem>
                                        )}
                                    {card.type === "dolla" &&
                                        deck !== "dolla" && (
                                            <MenuItem
                                                onClick={() =>
                                                    addDolla(idx, card, deck)
                                                }
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
                                            <MenuItem
                                                onClick={() => addBunny(card)}
                                            >
                                                Add Bunny
                                            </MenuItem>
                                        )}
                                    {card.kind !== "carrotCard" &&
                                        playerName === player && (
                                            <MenuItem
                                                onClick={() =>
                                                    discard(idx, card, deck)
                                                }
                                            >
                                                Discard
                                            </MenuItem>
                                        )}

                                    {card.kind === "carrotCard" &&
                                        deck === "carrots" && (
                                            <MenuItem
                                                onClick={() =>
                                                    discardCarrot(
                                                        idx,
                                                        card,
                                                        deck
                                                    )
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
                                <Card.Img
                                    src={`${
                                        card.deck ? card.deck : "blue"
                                    }/${cardImg}.png`}
                                ></Card.Img>
                            </Card.Body>
                        </Card>
                    )}
                </Carousel.Item>
            </Carousel>
        </>
    );
}
