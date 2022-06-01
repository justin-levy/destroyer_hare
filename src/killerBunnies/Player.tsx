import React, { useEffect, useState } from "react";
import { Col, Button } from "react-bootstrap";
import Cell from "./Card.tsx";

const emptyPlayingCard = {
    id: 0,
    color: "white",
    name: "",
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

    const [hand, setHand] = useState([]);
    const [run, setRun] = useState([]);
    const [dolla, setDolla] = useState(0);
    const [bunnies, setBunnies] = useState([]);
    const [carrots, setCarrots] = useState([]);
    const [playingCard, setPlayingCard] = useState(emptyPlayingCard);

    useEffect(() => {
        console.log(discardedDeck);
    }, [discardedDeck]);

    function addDolla(card) {
        setDolla(dolla + card.quantity);
        setHand(hand.filter((c) => c.id !== card.id));
        discardCard(card);
    }

    function draw() {
        if (deck.length > 0 && hand.length + run.length <= 6) {
            setHand([...hand, deck[0]]);
            takeCard("deck");
        }
    }

    function runRun(cardMoved) {
        if (run.length >= 2) return;

        setHand(hand.filter((card) => cardMoved.id !== card.id));
        setRun([...run, cardMoved]);
    }

    function myTurn() {
        if (playingCard.id !== 0) return;

        setPlayingCard(run[0]);
        setRun(run.filter((card, idx) => idx !== 0));
    }

    function playCard(card) {
        if (card.type === "bunny") {
            setBunnies([...bunnies, card]);
            setPlayingCard(emptyPlayingCard);
        } else if (card.type === "carrot") {
            if (bunnies.length > 0) {
                if (card.quantity === 1)
                    setCarrots([...carrots, carrotDeck[0]]);
                else if (card.quantity === 2) {
                    setCarrots([...carrots, carrotDeck[0], carrotDeck[1]]);
                    takeCard("carrotDeck");
                }
                takeCard("carrotDeck");
            }
            setPlayingCard(emptyPlayingCard);
            discardCard(card);
        } else if (card.type == "weapon") {
            if (bunnies.length === 0) {
                setPlayingCard(emptyPlayingCard);
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
            <div style={{ padding: "2em" }}>Dolla: {dolla}</div>

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
