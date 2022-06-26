import React, { useEffect, useState } from "react";
import { Col, Button, Row, Tabs, Tab } from "react-bootstrap";
import { Deck, PlayingCard } from "./Card.tsx";

const emptyPlayingCard = {
    id: 0,
};

const defaultPlayerState = {
    hand: [],
    run: [],
    dolla: [],
    special: [],
    bunnies: [],
    carrots: [],
    playingCard: emptyPlayingCard,
};

function DisplayCardsIcons({ cards, basicFunctions, name }) {
    return (
        <>
            {cards.map((card, idx) => (
                <PlayingCard
                    card={card}
                    idx={idx}
                    key={idx}
                    basicFunctions={basicFunctions}
                    title={card.name}
                    deck={name}
                />
            ))}
        </>
    );
}

function Player({
    gameState,
    takeCard,
    discardCard,
    discardCarrotCard,
    setMarket,
}) {
    const { deck, carrotDeck, discardedDeck } = gameState;

    const [playerState, setPlayerState] = useState(defaultPlayerState);
    const { hand, run, dolla, special, bunnies, carrots, playingCard } =
        playerState;

    // useEffect(() => {
    //     console.log(discardedDeck);
    // }, [discardedDeck]);

    // useEffect(() => {
    //     console.log(playerState);
    // }, [playerState]);

    function draw() {
        if (deck.length > 0 && hand.length + run.length <= 6) {
            setPlayerState({
                ...playerState,
                hand: [...hand, deck[0]],
            });
            takeCard("deck");
        }
    }

    function takeFromDiscardPile() {
        if (discardedDeck.length > 0 && hand.length + run.length <= 6) {
            setPlayerState({
                ...playerState,
                hand: [...hand, discardedDeck[0]],
            });
            takeCard("discardedDeck");
        }
    }

    function drawCarrot() {
        if (carrotDeck.length > 0) {
            setPlayerState({
                ...playerState,
                carrots: [...carrots, carrotDeck[0]],
            });
            takeCard("carrotDeck");
        }
    }

    function addDolla(card, deck) {
        setPlayerState({
            ...playerState,
            dolla: [...dolla, card],
            [deck]: playerState[deck].filter((c) => c.id !== card.id),
        });
    }

    function addSpecial(card, deck) {
        if (deck === "playing")
            setPlayerState({
                ...playerState,
                special: [...special, card],
                playingCard: emptyPlayingCard,
            });
        else
            setPlayerState({
                ...playerState,
                special: [...special, card],
                [deck]: playerState[deck].filter((c) => c.id !== card.id),
            });
    }

    function addBunny(card) {
        setPlayerState({
            ...playerState,
            bunnies: [...bunnies, card],
            playingCard: emptyPlayingCard,
        });
    }

    function discard(card, deck) {
        if (deck === "playing")
            setPlayerState({
                ...playerState,
                playingCard: emptyPlayingCard,
            });
        else
            setPlayerState({
                ...playerState,
                [deck]: playerState[deck].filter((c) => c.id !== card.id),
            });
        discardCard(card);
    }

    function changeMarket(card) {
        setPlayerState({
            ...playerState,
            playingCard: emptyPlayingCard,
        });
        setMarket(card);
    }

    function discardCarrot(card, deck) {
        setPlayerState({
            ...playerState,
            [deck]: playerState[deck].filter((c) => c.id !== card.id),
        });
        discardCarrotCard(card);
    }

    function playRun(cardMoved) {
        if (run.length >= 2) return;

        setPlayerState({
            ...playerState,
            hand: hand.filter((card) => cardMoved.id !== card.id),
            run: [...run, cardMoved],
        });
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
        setPlayerState({
            ...playerState,
            playingCard: run[0],
            run: run.filter((card, idx) => idx !== 0),
        });
    }

    // function playCard(card) {
    //     if (card.type === "bunny") {
    //
    //     } else if (card.type === "carrot") {
    //         if (bunnies.length === 0) {
    //             setPlayerState({
    //                 ...playerState,
    //                 playingCard: emptyPlayingCard,
    //             });
    //             discardCard(card);
    //         } else {
    //             setPlayerState({
    //                 ...playerState,
    //                 playingCard: emptyPlayingCard,
    //                 carrots: [...carrots, carrotDeck[0]],
    //             });
    //             discardCard(card);
    //             takeCard("carrotDeck");
    //         }
    //     } else if (card.type == "weapon") {
    //         if (bunnies.length === 0) {
    //             setPlayerState({
    //                 ...playerState,
    //                 playingCard: emptyPlayingCard,
    //             });
    //             discardCard(card);
    //         }
    //     } else if (card.type == "feed") {
    //         if (bunnies.length === 0) {
    //             setPlayerState({
    //                 ...playerState,
    //                 playingCard: emptyPlayingCard,
    //             });
    //             discardCard(card);
    //         }
    //     } else {
    //         console.log("click");
    //     }
    // }

    return (
        <Col md>
            {
                // bunnies.map((card, idx) => (
                //     <Cell
                //         card={card}
                //         idx={idx}
                //         key={idx}
                //         handleClick={() => console.log("click")}
                //         title={card.name}
                //     />
                // ))
            }

            {
                // <div style={{ padding: "1em" }}>{/* Dolla: {dolla} */}</div>
            }

            <Row>
                <Deck
                    card={{ cardType: "Deck" }}
                    title={`Deck : ${gameState.deck.length} Cards`}
                    handleClick={() => draw()}
                    actionTitle="Draw"
                    picture="/blue.png"
                />

                <Deck
                    card={{ cardType: "Carrots" }}
                    title={`Carrots : ${gameState.carrotDeck.length} Cards`}
                    handleClick={() => drawCarrot()}
                    actionTitle="Draw"
                    picture="/carrot.png"
                />

                <Deck
                    card={{ cardType: "Market" }}
                    title={`Market`}
                    handleClick={() => console.log()}
                    actionTitle=""
                    picture={`${gameState.market.deck}/${gameState.market.id}.png`}
                />

                <Deck
                    card={{ cardType: "Discarded" }}
                    title={`Discarded Cards : ${gameState.discardedDeck.length} Cards`}
                    handleClick={() => takeFromDiscardPile()}
                    actionTitle="Draw"
                    picture={
                        gameState.discardedDeck.length
                            ? `blue/${gameState.discardedDeck[0].id}.png`
                            : ``
                    }
                />
            </Row>

            <div style={{ padding: "1em" }}></div>

            <Row>
                {playingCard.id !== 0 && (
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
                {run.map((card, idx) => (
                    <Deck
                        card={card}
                        title={`Run ${idx + 1}`}
                        handleClick={() => playCard()}
                        actionTitle="Move in Run"
                        picture="/carrot.png"
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
