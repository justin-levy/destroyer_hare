import React from "react";
import { Col, Row } from "react-bootstrap";
import { DisplayCardsIcons } from "../../_components/DisplayCardIcons";
import { GetBunnyCircle } from "../../_firebase/getData";

const BunnyCircleLayout = ({ gameId, playerName }) => {
    const bunnyCircle = GetBunnyCircle(gameId);

    return (
        <>
            <Col>
                <div className="bunnyCircle_playerName">Justin</div>
                <Row>
                    <DisplayCardsIcons
                        name={"bunnies"}
                        cards={bunnyCircle.justin}
                        player={"Justin"}
                        gameId={gameId}
                        playerName={playerName}
                    />
                </Row>
            </Col>

            <Col>
                <div className="bunnyCircle_playerName">Lizzie</div>
                <Row>
                    <DisplayCardsIcons
                        name={"bunnies"}
                        cards={bunnyCircle.lizzie}
                        player={"Lizzie"}
                        gameId={gameId}
                        playerName={playerName}
                    />
                </Row>
            </Col>
            <Col>
                <div className="bunnyCircle_playerName">Marie</div>
                <Row>
                    <DisplayCardsIcons
                        name={"bunnies"}
                        cards={bunnyCircle.marie}
                        player={"Marie"}
                        gameId={gameId}
                        playerName={playerName}
                    />
                </Row>
            </Col>
        </>
    );
};

export default BunnyCircleLayout;
