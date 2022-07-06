import React, { useState } from "react";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import Player from "./killerBunnies/Player";
import {
    blueDeck,
    carrotDeckDefault,
    marketStarterCard,
    cabbage,
    water,
    smallCarrotDeck,
} from "./killerBunnies/bluedeck";
import { getLength, shuffleArray, shuffleArray2 } from "./killerBunnies/utils";
import "./App.css";
import { GetGameState, GetSelectedDecks } from "./_firebase/getData";
import { simpleAdd, simplePush, simpleUpdate } from "./_firebase/simpleCD";
import {
    yellowCarrotDeck,
    yellowDeck,
    yellowSmallCarrotDeck,
} from "./killerBunnies/yellowdeck";
import ToggleButton from "react-toggle-button";
import { advantageousCarrots } from "./killerBunnies/customDecks";
import {
    redCCarrotDeck,
    redCDeck,
    redCSmallCarrotDeck,
} from "./killerBunnies/redcdeck";

const emptyPlayingCard = {
    id: 0,
};

function App() {
    const gameId = "12345";
    const gameState = GetGameState(gameId);
    const gameDecks = GetSelectedDecks(gameId);
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
        simplePush(`${gameId}/gameState/discardedDeck/`, card);
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

    // Full Deck
    const yellow = gameDecks.yellow ? [...blueDeck, ...yellowDeck] : blueDeck;
    const redC = gameDecks.redC ? [...yellow, ...redCDeck] : yellow;

    const fullDeck = gameDecks.advantageousCarrots
        ? [...redC, ...advantageousCarrots]
        : redC;

    // Carrot Deck

    const yellowCarrots = gameDecks.yellow
        ? [...carrotDeckDefault, ...yellowCarrotDeck]
        : carrotDeckDefault;

    const fullCarrotDeck = gameDecks.redC
        ? [...yellowCarrots, ...redCCarrotDeck]
        : yellowCarrots;

    // Small Carrot Deck

    const yellowSmallCarrots = gameDecks.yellow
        ? [...smallCarrotDeck, ...yellowSmallCarrotDeck]
        : smallCarrotDeck;

    const fullSmallCarrotDeck = gameDecks.redC
        ? [...yellowSmallCarrots, ...redCSmallCarrotDeck]
        : yellowSmallCarrots;

    function startNewGame() {
        simpleAdd(`${gameId}/gameState`, {
            deck: shuffleArray(fullDeck),
            carrotDeck: shuffleArray(fullCarrotDeck),
            cabbageDeck: shuffleArray(cabbage),
            waterDeck: shuffleArray(water),
            smallCarrotDeck: shuffleArray2(fullSmallCarrotDeck),
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
                    <div style={{ padding: ".5em" }}></div>
                    <Row>
                        <ToggleButton value={gameDecks.blue} />
                        Blue Deck
                    </Row>
                    <Row>
                        <ToggleButton
                            value={gameDecks.yellow}
                            onClick={() =>
                                simpleUpdate(
                                    `12345/decks`,
                                    "yellow",
                                    !gameDecks.yellow
                                )
                            }
                        />
                        Yellow Deck
                    </Row>
                    <Row>
                        <ToggleButton
                            value={gameDecks.redC}
                            onClick={() =>
                                simpleUpdate(
                                    `12345/decks`,
                                    "redC",
                                    !gameDecks.redC
                                )
                            }
                        />
                        Red (Conquest)
                    </Row>
                    <div style={{ padding: ".5em" }}></div>
                    Custom Decks
                    <Row>
                        <ToggleButton
                            value={gameDecks.advantageousCarrots}
                            onClick={() =>
                                simpleUpdate(
                                    `12345/decks`,
                                    "advantageousCarrots",
                                    !gameDecks.advantageousCarrots
                                )
                            }
                        />
                        Advantageous Carrots
                    </Row>
                </Col>

                {playerName === "Lizzie" && gameState && (
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
                {playerName === "Marie" && gameState && (
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
                {playerName === "Justin" && gameState && (
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
