import React from "react";
import { Row } from "react-bootstrap";
import { simpleUpdate } from "../_firebase/simpleCD";
import ToggleButton from "react-toggle-button";

const DeckToggle = ({ gameDecks }) => {
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
                        simpleUpdate(`12345/decks`, "yellow", !gameDecks.yellow)
                    }
                />
                Yellow Deck
            </Row>
            <Row>
                <ToggleButton
                    value={gameDecks.redC}
                    onClick={() =>
                        simpleUpdate(`12345/decks`, "redC", !gameDecks.redC)
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
        </>
    );
};

export default DeckToggle;
