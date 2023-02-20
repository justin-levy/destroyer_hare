import React from "react";
import { Card, Carousel } from "react-bootstrap";

import { Menu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import {
    simpleAdd,
    simpleDelete,
    simplePush,
    simpleUpdate,
} from "../_firebase/simpleCD";
import { getLength } from "../layout/utils";

const emptyPlayingCard = {
    id: 0,
};

export function PlayingCard({
    card,
    idx,
    player = "",
    deck,
    allowOptions = true,
    playerName = "",
    gameId,
    gameState,
    playerState,
}) {
    if (!card) return;

    const { discardedDeck } = gameState;
    const { run, playingCard } = playerState;

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

    function addDolla(idx, card, deck) {
        simplePush(`${gameId}/${playerName}/dolla/`, card);
        simpleDelete(`${gameId}/${playerName}/${deck}/${idx}`);
    }

    function addSpecial(idx, card, deck) {
        if (deck === "playing") {
            simplePush(`${gameId}/${playerName}/special/`, card);
            removePlayingCard();
        } else {
            simplePush(`${gameId}/${playerName}/special/`, card);
            simpleDelete(`${gameId}/${playerName}/${deck}/${idx}`);
        }
    }

    function discardCard(card) {
        simplePush(`${gameId}/gameState/discardedDeck/`, card);
    }

    function discard(idx, card, deck) {
        if (deck === "playing") removePlayingCard();
        else simpleDelete(`${gameId}/${playerName}/${deck}/${idx}`);
        discardCard(card);
    }

    function discardCarrotCard(card) {
        simpleAdd(
            `${gameId}/gameState/carrotDeck/${getLength(discardedDeck)}`,
            card
        );
    }

    function discardCarrot(idx, card, deck) {
        simpleDelete(`${gameId}/${playerName}/${deck}/${idx}`);
        discardCarrotCard(card);
    }

    function playRun(idx, cardMoved) {
        if (getLength(run) >= 2) return;
        simpleUpdate(`${gameId}/${playerName}/run`, getLength(run), cardMoved);
        simpleDelete(`${gameId}/${playerName}/hand/${idx}`);
    }

    function setMarket(card) {
        simpleUpdate(`${gameId}/gameState`, "market", card);
    }

    function changeMarket(card) {
        removePlayingCard();
        setMarket(card);
    }

    function addToBunny(player, bunnyId) {
        if (playingCard.id === 0) return;
        if (player === "") return;

        simplePush(
            `${gameId}/${player}/bunnies/${bunnyId}/modifiers/`,
            playingCard
        );
        removePlayingCard();
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
                                {card.type === "run" && deck === "hand" && (
                                    <MenuItem
                                        onClick={() => playRun(idx, card)}
                                    >
                                        Run
                                    </MenuItem>
                                )}
                                {card.type === "special" && deck === "hand" && (
                                    <MenuItem
                                        onClick={() => playRun(idx, card)}
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
                                        onClick={() => addToBunny(player, idx)}
                                    >
                                        Add Playing Card to Bunny
                                    </MenuItem>
                                )}
                                {card.kind === "market" &&
                                    deck === "playing" && (
                                        <MenuItem
                                            onClick={() => changeMarket(card)}
                                        >
                                            Change Market
                                        </MenuItem>
                                    )}
                                {card.type === "dolla" && deck !== "dolla" && (
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
