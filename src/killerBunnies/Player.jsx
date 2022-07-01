import React, { useEffect, useState } from "react";
import { Col, Button, Row, Tabs, Tab } from "react-bootstrap";
import { GetPlayerState } from "../_firebase/getData";
import {
    simpleAdd,
    simpleDelete,
    simplePush,
    simpleUpdate,
} from "../_firebase/simpleCD";
import { Deck, PlayingCard } from "./Card";
import { getLength } from "./utils";

const emptyPlayingCard = {
    id: 0,
};

function DisplayCardsIcons({ cards, basicFunctions, name }) {
    return (
        <>
            {cards &&
                Object.entries(cards).map((card) => (
                    <PlayingCard
                        card={card[1]}
                        idx={card[0]}
                        key={card[0]}
                        basicFunctions={basicFunctions}
                        title={card[1].name}
                        deck={name}
                    />
                ))}
        </>
    );
}

function Player({
    gameId,
    gameState,
    playerName,
    takeCard,
    discardCard,
    discardCarrotCard,
    setMarket,
}) {
    const { deck, carrotDeck, discardedDeck } = gameState;

    const playerState = GetPlayerState(gameId, playerName);
    // console.log(playerName, playerState);
    if (!playerState) return;

    const { hand, run, dolla, special, bunnies, carrots, playingCard } =
        playerState;

    // useEffect(() => {
    //     console.log(discardedDeck);
    // }, [discardedDeck]);

    // useEffect(() => {
    //     console.log(playerState);
    // }, [playerState]);

    function draw() {
        if (getLength(deck) > 0 && getLength(hand) + getLength(run) <= 6) {
            const data = takeCard("deck");
            simplePush(`${gameId}/${playerName}/hand/`, data[1]);
        }
    }

    function takeFromDiscardPile() {
        if (
            getLength(discardedDeck) > 0 &&
            getLength(hand) + getLength(run) <= 6
        ) {
            const data = takeCard("discardedDeck");
            simplePush(`${gameId}/${playerName}/hand/`, data[1]);
        }
    }

    function drawCarrot() {
        if (getLength(carrotDeck) > 0) {
            const data = takeCard("carrotDeck");
            simplePush(`${gameId}/${playerName}/carrots/`, data[1]);
        }
    }

    function addDolla(idx, card, deck) {
        simplePush(`${gameId}/${playerName}/dolla/`, card);
        simpleDelete(`${gameId}/${playerName}/${deck}/${idx}`);
    }

    function addSpecial(idx, card, deck) {
        if (deck === "playing") {
            simplePush(`${gameId}/${playerName}/special/`, card);
            simpleUpdate(
                `${gameId}/${playerName}/`,
                "playingCard",
                emptyPlayingCard
            );
        } else {
            simplePush(`${gameId}/${playerName}/special/`, card);
            simpleDelete(`${gameId}/${playerName}/${deck}/${idx}`);
        }
    }

    function addBunny(card) {
        simplePush(`${gameId}/${playerName}/bunnies/`, card);
        simpleUpdate(
            `${gameId}/${playerName}/`,
            "playingCard",
            emptyPlayingCard
        );
    }

    function discard(idx, card, deck) {
        if (deck === "playing")
            simpleUpdate(
                `${gameId}/${playerName}/`,
                "playingCard",
                emptyPlayingCard
            );
        else simpleDelete(`${gameId}/${playerName}/${deck}/${idx}`);
        discardCard(card);
    }

    function changeMarket(card) {
        simpleUpdate(
            `${gameId}/${playerName}/`,
            "playingCard",
            emptyPlayingCard
        );
        setMarket(card);
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

    const basicFunctions = {
        addBunny,
        addDolla,
        addSpecial,
        discard,
        playRun,
        discardCarrot,
        changeMarket,
    };

    function playCard() {
        if (playingCard.id !== 0) return;

        simpleUpdate(`${gameId}/${playerName}`, "playingCard", run[0]);

        if (getLength(run) == 2) {
            simpleUpdate(`${gameId}/${playerName}/run`, "0", run[1]);
            simpleDelete(`${gameId}/${playerName}/run/1`);
        } else simpleDelete(`${gameId}/${playerName}/run/0`);
    }

    return (
        <Col md>
            <Row>
                <Deck
                    card={{ cardType: "Deck" }}
                    title={`Deck : ${getLength(gameState.deck)} Cards`}
                    handleClick={() => draw()}
                    actionTitle="Draw"
                    picture="destroyer_hare/blue.png"
                />

                <Deck
                    card={{ cardType: "Carrots" }}
                    title={`Carrots : ${getLength(gameState.carrotDeck)} Cards`}
                    handleClick={() => drawCarrot()}
                    actionTitle="Draw"
                    picture="destroyer_hare/carrot.png"
                />

                <Deck
                    card={{ cardType: "Market" }}
                    title={`Market`}
                    handleClick={() => console.log()}
                    actionTitle=""
                    picture={`destroyer_hare/${gameState.market.deck}/${gameState.market.id}.png`}
                />

                <Deck
                    card={{ cardType: "Discarded" }}
                    title={`Discarded Cards : ${
                        gameState.discardedDeck
                            ? getLength(gameState.discardedDeck)
                            : 0
                    } Cards`}
                    handleClick={() => takeFromDiscardPile()}
                    actionTitle="Draw"
                    picture={
                        gameState.discardedDeck &&
                        getLength(gameState.discardedDeck)
                            ? `destroyer_hare/blue/${
                                  Object.entries(gameState.discardedDeck)[
                                      getLength(gameState.discardedDeck) - 1
                                  ][1].id
                              }.png`
                            : ``
                    }
                />
            </Row>
            <div style={{ padding: "1em" }}></div>

            <Row>
                {playingCard && playingCard.id !== 0 && (
                    <Col>
                        <div>Playing</div>
                        <PlayingCard
                            card={playingCard}
                            idx={0}
                            basicFunctions={basicFunctions}
                            deck="playing"
                        />
                    </Col>
                )}
                {run &&
                    Object.entries(run).map((card, idx) => (
                        <Deck
                            card={card}
                            title={`Run ${idx + 1}`}
                            handleClick={() => playCard()}
                            actionTitle="Move in Run"
                            picture="destroyer_hare/carrot.png"
                            key={idx}
                        />
                    ))}
            </Row>
            <div style={{ padding: "1em" }}></div>

            <Tabs
                defaultActiveKey="hand"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="hand" title="Hand">
                    <DisplayCardsIcons
                        name={"hand"}
                        cards={hand}
                        basicFunctions={basicFunctions}
                    />
                </Tab>
                <Tab eventKey="bunnies" title="Bunnies">
                    <DisplayCardsIcons
                        name={"bunnies"}
                        cards={bunnies}
                        basicFunctions={basicFunctions}
                    />
                </Tab>
                <Tab eventKey="dolla" title="Dolla">
                    <DisplayCardsIcons
                        name={"dolla"}
                        cards={dolla}
                        basicFunctions={basicFunctions}
                    />
                </Tab>
                <Tab eventKey="special" title="Special">
                    <DisplayCardsIcons
                        name={"special"}
                        cards={special}
                        basicFunctions={basicFunctions}
                    />
                </Tab>
                <Tab eventKey="carrots" title="Carrots">
                    <DisplayCardsIcons
                        name={"carrots"}
                        cards={carrots}
                        basicFunctions={basicFunctions}
                    />
                </Tab>
            </Tabs>
        </Col>
    );
}

export default Player;
