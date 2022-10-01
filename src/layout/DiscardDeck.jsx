import React from "react";
import { Card, Carousel } from "react-bootstrap";

import { Menu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { simpleDelete, simplePush, simpleUpdate } from "../_firebase/simpleCD";
import { getLength } from "./utils";
import { useState } from "react";
import { useEffect } from "react";

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
        <>
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
        </>
    );
}
