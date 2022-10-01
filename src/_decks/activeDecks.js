import { blueDeck, carrotDeckDefault, smallCarrotDeck } from "./bluedeck";
import {
    yellowCarrotDeck,
    yellowDeck,
    yellowSmallCarrotDeck,
} from "./yellowdeck";
import { advantageousCarrots } from "./customDecks";
import { redCCarrotDeck, redCDeck, redCSmallCarrotDeck } from "./redcdeck";

const getFullDeck = (gameDecks) => {
    const yellow = gameDecks.yellow ? [...blueDeck, ...yellowDeck] : blueDeck;
    const redC = gameDecks.redC ? [...yellow, ...redCDeck] : yellow;

    const fullDeck = gameDecks.advantageousCarrots
        ? [...redC, ...advantageousCarrots]
        : redC;

    return fullDeck;
};

const getCarrotDeck = (gameDecks) => {
    const yellowCarrots = gameDecks.yellow
        ? [...carrotDeckDefault, ...yellowCarrotDeck]
        : carrotDeckDefault;

    const fullCarrotDeck = gameDecks.redC
        ? [...yellowCarrots, ...redCCarrotDeck]
        : yellowCarrots;
    return fullCarrotDeck;
};

const getSmallCarrotDeck = (gameDecks) => {
    const yellowSmallCarrots = gameDecks.yellow
        ? [...smallCarrotDeck, ...yellowSmallCarrotDeck]
        : smallCarrotDeck;

    const fullSmallCarrotDeck = gameDecks.redC
        ? [...yellowSmallCarrots, ...redCSmallCarrotDeck]
        : yellowSmallCarrots;
    return fullSmallCarrotDeck;
};

export { getFullDeck, getCarrotDeck, getSmallCarrotDeck };
