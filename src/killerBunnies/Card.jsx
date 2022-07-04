import React from "react";
import { Card, Carousel, Col } from "react-bootstrap";

import { Menu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { simpleDelete, simplePush, simpleUpdate } from "../_firebase/simpleCD";
import { getLength } from "./utils";
import { useState } from "react";
import { useEffect } from "react";

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

export function ResourceCard({ card, type, player, id }) {
    if (!card) return;

    return (
        <Menu
            menuButton={
                <Card>
                    <Card.Body className="p-1">
                        <Card.Img src={`${type}.png`}></Card.Img>
                    </Card.Body>
                    <Card.Text>{card}</Card.Text>
                </Card>
            }
            transition
        >
            <MenuItem
                onClick={() => simpleDelete(`12345/${player}/${type}/${id}`)}
            >
                Discard
            </MenuItem>
        </Menu>
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
                                    {card.kind !== "carrotCard" && (
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

export function Deck({ card, title, picture, actions, doubleClick }) {
    const handleMultiClicks = (e) => {
        switch (e.detail) {
            case 1:
                // console.log("click");
                break;
            case 2:
                doubleClick();
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

export function DiscardDeck({
    deck,
    gameId,
    playerName,
    currentPlayer,
    playingCard,
}) {
    const [currentSlide, setCurrentSlide] = useState(-1);
    useEffect(() => setCurrentSlide(getLength(deck) - 1), [deck]);

    const handleSelect = (selectedIndex, e) => {
        setCurrentSlide(selectedIndex);
    };

    function addDolla(idx, card) {
        simplePush(`${gameId}/${playerName}/dolla/`, card);
        simpleDelete(`${gameId}/gameState/discardedDeck/${idx}`);
    }
    function addBunny(idx, card) {
        simplePush(`${gameId}/${playerName}/bunnies/`, card);
        simpleDelete(`${gameId}/gameState/discardedDeck/${idx}`);
    }
    function playCard(idx, card) {
        if (currentPlayer !== "") return;
        if (playingCard.id !== 0) return;

        simpleUpdate(`${gameId}/${playerName}`, "playingCard", card);
        simpleDelete(`${gameId}/gameState/discardedDeck/${idx}`);
    }

    return (
        <Col>
            <Carousel
                nextLabel=""
                prevLabel=""
                style={{ width: "145px" }}
                indicators={false}
                controls={getLength(deck) !== 0 && getLength(deck) !== 1}
                interval={null}
                activeIndex={currentSlide}
                onSelect={handleSelect}
                prevIcon={
                    currentSlide !== 0 && (
                        <span
                            aria-hidden="true"
                            className="carousel-control-prev-icon"
                        />
                    )
                }
                nextIcon={
                    currentSlide !== getLength(deck) - 1 && (
                        <span
                            aria-hidden="true"
                            className="carousel-control-next-icon"
                        />
                    )
                }
                // default on last
                // controls based on deck, not circle
            >
                {getLength(deck) ? (
                    Object.entries(deck).map((card, idx) => (
                        <Carousel.Item key={idx}>
                            <Menu
                                menuButton={
                                    <Card>
                                        <Card.Body className="p-1">
                                            <Card.Img
                                                src={`${card[1].deck}/${card[1].id}.png`}
                                            ></Card.Img>
                                        </Card.Body>
                                    </Card>
                                }
                                transition
                            >
                                {card[1].type === "dolla" && (
                                    <MenuItem
                                        onClick={() =>
                                            addDolla(card[0], card[1])
                                        }
                                    >
                                        Add Dolla
                                    </MenuItem>
                                )}
                                {card[1].kind === "bunny" && (
                                    <MenuItem
                                        onClick={() =>
                                            addBunny(card[0], card[1])
                                        }
                                    >
                                        Add Bunny
                                    </MenuItem>
                                )}

                                <MenuItem
                                    onClick={() => playCard(card[0], card[1])}
                                >
                                    Move to Playing
                                </MenuItem>
                            </Menu>
                        </Carousel.Item>
                    ))
                ) : (
                    <Card>
                        <Card.Body className="p-1">
                            <Card.Img src={``}></Card.Img>
                        </Card.Body>
                    </Card>
                )}
            </Carousel>
            <div style={{ textAlign: "left" }}>{`Discarded Cards : ${getLength(
                deck
            )} Cards`}</div>
        </Col>
    );
}