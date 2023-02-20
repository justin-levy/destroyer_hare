import React from "react";
import { Col, Row, Tabs, Tab } from "react-bootstrap";
import { Deck } from "../../_components/Deck";
import { DisplayResources } from "../../_components/DisplayResources";

import { DisplayCardsIcons } from "../../_components/DisplayCardIcons";
import { capitalizeFirstLetter, getLength } from "../utils";
import { GetDolla, GetSpecial } from "../../_firebase/getData";
import { simpleDelete, simpleUpdate } from "../../_firebase/simpleCD";

const players = ["lizzie", "marie", "justin"];

const Hand = ({
    gameId,
    playerName,
    playerState,
    currentPlayer,
    gameState,
}) => {
    const otherDolla = GetDolla(gameId, playerName);
    const otherSpecial = GetSpecial(gameId, playerName);

    const { hand, playingCard, run, dolla, special, carrots, cabbage, water } =
        playerState;

    function playCard() {
        if (currentPlayer !== "") return;
        if (playingCard.id !== 0) return;

        simpleUpdate(`${gameId}/${playerName}`, "playingCard", run[0]);

        if (getLength(run) === 2) {
            simpleUpdate(`${gameId}/${playerName}/run`, "0", run[1]);
            simpleDelete(`${gameId}/${playerName}/run/1`);
        } else simpleDelete(`${gameId}/${playerName}/run/0`);
    }

    return (
        <Tabs
            defaultActiveKey="hand"
            id="uncontrolled-tab-example"
            className="mb-3"
        >
            <Tab eventKey="hand" title="Hand">
                <Row>
                    {run &&
                        Object.entries(run).map((card, idx) => (
                            <Col>
                                <Deck
                                    card={card}
                                    title={`Run ${idx + 1}`}
                                    actions={[
                                        {
                                            actionTitle: "Move in Run",
                                            handleClick: playCard,
                                        },
                                    ]}
                                    picture={`${card[1].deck}/${card[1].id}.png`}
                                    key={idx}
                                />
                            </Col>
                        ))}
                    <DisplayCardsIcons
                        name={"hand"}
                        cards={hand}
                        gameId={gameId}
                        gameState={gameState}
                        playerState={playerState}
                        playerName={playerName}
                    />
                </Row>
            </Tab>
            <Tab eventKey="dolla" title="Dolla">
                <DisplayCardsIcons
                    name={"dolla"}
                    cards={dolla}
                    gameId={gameId}
                    gameState={gameState}
                    playerState={playerState}
                    playerName={playerName}
                />
            </Tab>
            <Tab eventKey="special" title="Special">
                <DisplayCardsIcons
                    name={"special"}
                    cards={special}
                    gameId={gameId}
                    gameState={gameState}
                    playerState={playerState}
                    playerName={playerName}
                />
            </Tab>
            <Tab eventKey="carrots" title="Carrots">
                <DisplayCardsIcons
                    name={"carrots"}
                    cards={carrots}
                    gameId={gameId}
                    gameState={gameState}
                    playerState={playerState}
                    playerName={playerName}
                />
            </Tab>
            <Tab eventKey="cabbageAndWater" title="Cabbage and Water">
                <DisplayResources
                    cabbage={cabbage}
                    water={water}
                    player={playerName}
                    gameState={gameState}
                    playerState={playerState}
                    gameId={gameId}
                />
            </Tab>
            <Tab title="" tabClassName="workingTab"></Tab>

            {players.map(
                (player) =>
                    playerName !== capitalizeFirstLetter(player) && [
                        <Tab
                            key={`${player}Dolla`}
                            eventKey={`${player}Dolla`}
                            title={`${capitalizeFirstLetter(player)}'s Dolla`}
                            tabClassName={`${player}Tab`}
                        >
                            <DisplayCardsIcons
                                name={"dolla"}
                                cards={otherDolla[player]}
                                gameId={gameId}
                                allowOptions={false}
                                gameState={gameState}
                                playerState={playerState}
                                playerName={playerName}
                            />
                        </Tab>,
                        <Tab
                            key={`${player}Special`}
                            eventKey={`${player}Special`}
                            title={`${capitalizeFirstLetter(
                                player
                            )}'s Special Cards`}
                            tabClassName={`${player}Tab`}
                        >
                            <DisplayCardsIcons
                                name={"special"}
                                cards={otherSpecial[player]}
                                gameId={gameId}
                                allowOptions={false}
                                gameState={gameState}
                                playerState={playerState}
                                playerName={playerName}
                            />
                        </Tab>,
                    ]
            )}
        </Tabs>
    );
};

export default Hand;
