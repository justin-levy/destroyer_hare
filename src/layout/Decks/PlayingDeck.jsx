import React from "react";
import { Card, Carousel } from "react-bootstrap";

import { Menu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

import {
    simpleDelete,
    simplePush,
    simpleUpdate,
} from "../../_firebase/simpleCD";

const emptyPlayingCard = {
    id: 0,
};

export function PlayingDeck({
    card,
    idx,
    player = "",
    allowOptions = true,
    playerName = "",
    gameId,
}) {
    if (!card) return;

    const cardImg = card.id ? card.id : "0";
    const modifiers = card.modifiers;

    function removePlayingCard() {
        simpleUpdate(
            `${gameId}/${playerName}/`,
            "playingCard",
            emptyPlayingCard
        );
    }

    function addBunny(card) {
        simplePush(`${gameId}/${playerName}/bunnies/`, card);
        removePlayingCard();
    }

    function addSpecial(card) {
        simplePush(`${gameId}/${playerName}/special/`, card);
        removePlayingCard();
    }

    function discardCard(card) {
        simplePush(`${gameId}/gameState/discardedDeck/`, card);
    }

    function discard(card) {
        removePlayingCard();
        discardCard(card);
    }

    function changeMarket(card) {
        removePlayingCard();
        simpleUpdate(`${gameId}/gameState`, "market", card);
    }

    return (
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
                                        `${gameId}/${player}/bunnies/${idx}/modifiers/${modifier[0]}`
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
                                {card.type === "special" && (
                                    <MenuItem onClick={() => addSpecial(card)}>
                                        Add to Special Cards
                                    </MenuItem>
                                )}
                                {card.kind === "market" && (
                                    <MenuItem
                                        onClick={() => changeMarket(card)}
                                    >
                                        Change Market
                                    </MenuItem>
                                )}
                                {card.type === "verySpecial" && (
                                    <MenuItem onClick={() => addSpecial(card)}>
                                        Add to Special Cards
                                    </MenuItem>
                                )}
                                {card.kind === "bunny" && (
                                    <MenuItem onClick={() => addBunny(card)}>
                                        Add Bunny
                                    </MenuItem>
                                )}
                                {card.kind !== "carrotCard" &&
                                    playerName === player && (
                                        <MenuItem onClick={() => discard(card)}>
                                            Discard
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
    );
}
