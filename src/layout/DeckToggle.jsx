import React from "react";
import { Row } from "react-bootstrap";
import { simpleUpdate } from "../_firebase/simpleCD";
import ToggleButton from "react-toggle-button";

const DeckToggle = ({ gameDecks, gameId }) => {
    return (
        <>
            <Row>
                <ToggleButton value={gameDecks.blue} />
                Blue Deck
            </Row>
            <Row>
                <ToggleButton
                    value={gameDecks.yellow}
                    onClick={() =>
                        simpleUpdate(
                            `${gameId}/decks`,
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
                        simpleUpdate(`${gameId}/decks`, "redC", !gameDecks.redC)
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
                            `${gameId}/decks`,
                            "advantageousCarrots",
                            !gameDecks.advantageousCarrots
                        )
                    }
                />
                Advantageous Carrots
            </Row>
        </>
    );
};

export default DeckToggle;
