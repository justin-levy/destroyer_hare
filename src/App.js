import React, { useState } from "react";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import Player from "./killerBunnies/Player";
import {
    deckDefault,
    carrotDeckDefault,
    marketStarterCard,
    cabbage,
    water,
    smallCarrotDeck,
} from "./killerBunnies/bluedeck";
import { getLength, shuffleArray, shuffleArray2 } from "./killerBunnies/utils";
import "./App.css";
import { GetGameState } from "./_firebase/getData";
import { simpleAdd, simpleUpdate } from "./_firebase/simpleCD";

const emptyPlayingCard = {
    id: 0,
};

function App() {
    const gameId = "12345";
    const gameState = GetGameState(gameId);
    const [playerName, setPlayerName] = useState("player1");
    const { discardedDeck } = gameState;

    const takeCard = (pile) => {
        let cardToTake = {};
        const deckSize = getLength(gameState[pile]);
        const updatedPile = Object.entries(gameState[pile]).filter(
            (card, idx) => {
                if (idx !== deckSize - 1) return card;
                else cardToTake = card;
            }
        );
        simpleUpdate(
            `${gameId}/gameState`,
            pile,
            Object.fromEntries(updatedPile)
        );
        return cardToTake;
    };

    function discardCard(card) {
        simpleAdd(
            `${gameId}/gameState/discardedDeck/${getLength(discardedDeck)}`,
            card
        );
    }

    function discardCarrotCard(card) {
        simpleAdd(
            `${gameId}/gameState/carrotDeck/${getLength(discardedDeck)}`,
            card
        );
    }

    function setMarket(card) {
        simpleUpdate(`${gameId}/gameState`, "market", card);
    }

    function startNewGame() {
        simpleAdd(`${gameId}/gameState`, {
            deck: shuffleArray(deckDefault),
            carrotDeck: shuffleArray(carrotDeckDefault),
            cabbageDeck: shuffleArray(cabbage),
            waterDeck: shuffleArray(water),
            smallCarrotDeck: shuffleArray2(smallCarrotDeck),
            discardedDeck: [],
            market: marketStarterCard,
        });
        simpleAdd(`${gameId}/Lizzie`, {
            hand: [],
            run: [],
            dolla: [],
            special: [],
            bunnies: [],
            carrots: [],
            playingCard: emptyPlayingCard,
        });
        simpleAdd(`${gameId}/Marie`, {
            hand: [],
            run: [],
            dolla: [],
            special: [],
            bunnies: [],
            carrots: [],
            playingCard: emptyPlayingCard,
        });
        simpleAdd(`${gameId}/Justin`, {
            hand: [],
            run: [],
            dolla: [],
            special: [],
            bunnies: [],
            carrots: [],
            playingCard: emptyPlayingCard,
        });
    }

    return (
        <Container>
            <Row>
                <Col md={2}>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Settings
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item
                                onClick={() => {
                                    startNewGame();
                                }}
                            >
                                Start New Game!
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <select onChange={(e) => setPlayerName(e.target.value)}>
                        <option value="" defaultValue>
                            Choose a Player!
                        </option>
                        <option value="Marie">Marie</option>
                        <option value="Lizzie">Lizzie</option>
                        <option value="Justin">Justin</option>
                    </select>
                </Col>

                {playerName === "Lizzie" && gameState && gameState.deck && (
                    <Player
                        gameId={gameId}
                        gameState={gameState}
                        playerName={playerName}
                        takeCard={takeCard}
                        discardCard={discardCard}
                        discardCarrotCard={discardCarrotCard}
                        setMarket={setMarket}
                    />
                )}
                {playerName === "Marie" && gameState && gameState.deck && (
                    <Player
                        gameId={gameId}
                        gameState={gameState}
                        playerName={playerName}
                        takeCard={takeCard}
                        discardCard={discardCard}
                        discardCarrotCard={discardCarrotCard}
                        setMarket={setMarket}
                    />
                )}
                {playerName === "Justin" && gameState && gameState.deck && (
                    <Player
                        gameId={gameId}
                        gameState={gameState}
                        playerName={playerName}
                        takeCard={takeCard}
                        discardCard={discardCard}
                        discardCarrotCard={discardCarrotCard}
                        setMarket={setMarket}
                    />
                )}
            </Row>
        </Container>
    );
}

export default App;
