import React, { useEffect, useState } from "react";
import { Col, Button } from "react-bootstrap";
import Cell from "./Card.tsx";

const emptyPlayingCard = {
    id: 0,
    color: "white",
    name: "",
};

const defaultPlayerState = {
    hand: [],
    run: [],
    dolla: [],
    bunnies: [],
    carrots: [],
    playingCard: emptyPlayingCard,
};

function DisplayCardsIcons({ cards, setRun, addDolla }) {
    return (
        <>
            {cards.map((card, idx) => (
                <Cell
                    card={card}
                    idx={idx}
                    key={idx}
                    handleClick={card.type === "dolla" ? addDolla : setRun}
                    color={card.color}
                    title={card.name}
                />
            ))}
        </>
    );
}

function Player({ gameState, takeCard, discardCard }) {
    const { deck, carrotDeck, discardedDeck } = gameState;

    const [playerState, setPlayerState] = useState(defaultPlayerState);
    const { hand, run, dolla, bunnies, carrots, playingCard } = playerState;

    // useEffect(() => {
    //     console.log(discardedDeck);
    // }, [discardedDeck]);

    // useEffect(() => {
    //     console.log(playerState);
    // }, [playerState]);

    function addDolla(card) {
        setPlayerState({
            ...playerState,
            dolla: [...dolla, card],
            hand: hand.filter((c) => c.id !== card.id),
        });
    }

    function draw() {
        if (deck.length > 0 && hand.length + run.length <= 6) {
            setPlayerState({
                ...playerState,
                hand: [...hand, deck[0]],
            });
            takeCard("deck");
        }
    }

    function runRun(cardMoved) {
        if (run.length >= 2) return;

        setPlayerState({
            ...playerState,
            hand: hand.filter((card) => cardMoved.id !== card.id),
            run: [...run, cardMoved],
        });
    }

    function myTurn() {
        if (playingCard.id !== 0) return;

        setPlayerState({
            ...playerState,
            playingCard: run[0],
            run: run.filter((card, idx) => idx !== 0),
        });
    }

    function playCard(card) {
        if (card.type === "bunny") {
            setPlayerState({
                ...playerState,
                bunnies: [...bunnies, card],
                playingCard: emptyPlayingCard,
            });
        } else if (card.type === "carrot") {
            if (bunnies.length === 0) {
                setPlayerState({
                    ...playerState,
                    playingCard: emptyPlayingCard,
                });
                discardCard(card);
            } else {
                setPlayerState({
                    ...playerState,
                    playingCard: emptyPlayingCard,
                    carrots: [...carrots, carrotDeck[0]],
                });
                discardCard(card);
                takeCard("carrotDeck");
            }
        } else if (card.type == "weapon") {
            if (bunnies.length === 0) {
                setPlayerState({
                    ...playerState,
                    playingCard: emptyPlayingCard,
                });
                discardCard(card);
            }
        } else if (card.type == "feed") {
            if (bunnies.length === 0) {
                setPlayerState({
                    ...playerState,
                    playingCard: emptyPlayingCard,
                });
                discardCard(card);
            }
        } else {
            console.log("click");
        }
    }

    return (
        <Col md>
            <Button onClick={() => draw()}> Draw </Button>
            {bunnies.map((card, idx) => (
                <Cell
                    card={card}
                    idx={idx}
                    key={idx}
                    handleClick={() => console.log("click")}
                    color={card.color}
                    title={card.name}
                />
            ))}
            <div style={{ padding: "2em" }}>{/* Dolla: {dolla} */}</div>

            {playingCard.id !== 0 && (
                <Cell
                    card={playingCard}
                    idx={0}
                    color={playingCard.color}
                    handleClick={() => playCard(playingCard)}
                    title={playingCard.name}
                />
            )}
            {run.map((card, idx) => (
                <Cell
                    card={card}
                    idx={idx}
                    key={idx}
                    color={"grey"}
                    handleClick={() => myTurn()}
                    title={`Run ${idx + 1}`}
                />
            ))}
            <div style={{ padding: "2em" }}></div>
            <DisplayCardsIcons
                cards={hand}
                setRun={runRun}
                addDolla={addDolla}
            />
        </Col>
    );
}

export default Player;
