import React from "react";
import { Dropdown } from "react-bootstrap";
import { shuffleArray, shuffleArray2 } from "./utils";
import { simpleAdd } from "../_firebase/simpleCD";

import { marketStarterCard, cabbage, water } from "../_decks/bluedeck";
import {
    getCarrotDeck,
    getFullDeck,
    getSmallCarrotDeck,
} from "../_decks/activeDecks";

const emptyPlayingCard = {
    id: 0,
};

const Settings = ({ gameDecks, gameId }) => {
    const fullDeck = getFullDeck(gameDecks);
    const fullCarrotDeck = getCarrotDeck(gameDecks);
    const fullSmallCarrotDeck = getSmallCarrotDeck(gameDecks);

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
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Settings
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={startNewGame}>
                    Start New Game!
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default Settings;
