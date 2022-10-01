import React from "react";
import { Col, Row, Tabs, Tab } from "react-bootstrap";
import Footer from "../_components/Footer";
import {
    GetBunnyCircle,
    GetDolla,
    GetPlayerState,
    GetPlayingCards,
    GetSpecial,
} from "../_firebase/getData";
import { simpleDelete, simplePush, simpleUpdate } from "../_firebase/simpleCD";
import { Deck } from "../_components/Deck";
import { DiscardDeck } from "./DiscardDeck";
import { PlayingCard } from "../_components/PlayingCard";
import { DisplayResources } from "../_components/DisplayResources";

import { DisplayCardsIcons } from "../_components/DisplayCardIcons";
import { capitalizeFirstLetter, getLength } from "./utils";
import WinningCarrotDeck from "./WinningCarrotDeck";

const players = ["lizzie", "marie", "justin"];

const emptyPlayingCard = {
    id: 0,
};

function Player({
    gameId,
    gameState,
    playerName,
    takeCard,
    discardCard,
    discardCarrotCard,
    setMarket,
}) {
    const {
        deck,
        carrotDeck,
        discardedDeck,
        cabbageDeck,
        waterDeck,
        smallCarrotDeck,
        winningCarrot,
    } = gameState;

    const playerState = GetPlayerState(gameId, playerName);
    // console.log(playerName, playerState);
    if (!playerState) return;

    const { hand, run, dolla, special, carrots, playingCard, cabbage, water } =
        playerState;

    const allPlayingCards = GetPlayingCards(gameId);
    const bunnyCircle = GetBunnyCircle(gameId);
    const otherDolla = GetDolla(gameId, playerName);
    const otherSpecial = GetSpecial(gameId, playerName);

    function removePlayingCard() {
        simpleUpdate(
            `${gameId}/${playerName}/`,
            "playingCard",
            emptyPlayingCard
        );
    }

    function draw() {
        if (getLength(deck) > 0 && getLength(hand) + getLength(run) <= 6) {
            const data = takeCard("deck");
            simplePush(`${gameId}/${playerName}/hand/`, data[1]);
        }
    }

    // function takeFromDiscardPile() {
    //     if (
    //         getLength(discardedDeck) > 0 &&
    //         getLength(hand) + getLength(run) <= 6
    //     ) {
    //         const data = takeCard("discardedDeck");
    //         simplePush(`${gameId}/${playerName}/hand/`, data[1]);
    //     }
    // }

    function drawCarrot() {
        if (getLength(carrotDeck) > 0) {
            const data = takeCard("carrotDeck");
            simplePush(`${gameId}/${playerName}/carrots/`, data[1]);
        }
    }

    function drawCabbage() {
        if (getLength(cabbageDeck) > 0) {
            const data = takeCard("cabbageDeck");
            simplePush(`${gameId}/${playerName}/cabbage/`, data[1]);
        }
    }

    function drawWater() {
        if (getLength(waterDeck) > 0) {
            const data = takeCard("waterDeck");
            simplePush(`${gameId}/${playerName}/water/`, data[1]);
        }
    }

    function addDolla(idx, card, deck) {
        simplePush(`${gameId}/${playerName}/dolla/`, card);
        simpleDelete(`${gameId}/${playerName}/${deck}/${idx}`);
    }

    function addSpecial(idx, card, deck) {
        if (deck === "playing") {
            simplePush(`${gameId}/${playerName}/special/`, card);
            removePlayingCard();
        } else {
            simplePush(`${gameId}/${playerName}/special/`, card);
            simpleDelete(`${gameId}/${playerName}/${deck}/${idx}`);
        }
    }

    function addBunny(card) {
        simplePush(`${gameId}/${playerName}/bunnies/`, card);
        removePlayingCard();
    }

    function addToBunny(player, bunnyId) {
        if (playingCard.id === 0) return;
        if (player === "") return;

        simplePush(
            `${gameId}/${player}/bunnies/${bunnyId}/modifiers/`,
            playingCard
        );
        removePlayingCard();
    }

    function discard(idx, card, deck) {
        if (deck === "playing") removePlayingCard();
        else simpleDelete(`${gameId}/${playerName}/${deck}/${idx}`);
        discardCard(card);
    }

    function changeMarket(card) {
        removePlayingCard();
        setMarket(card);
    }

    function discardCarrot(idx, card, deck) {
        simpleDelete(`${gameId}/${playerName}/${deck}/${idx}`);
        discardCarrotCard(card);
    }

    function playRun(idx, cardMoved) {
        if (getLength(run) >= 2) return;
        simpleUpdate(`${gameId}/${playerName}/run`, getLength(run), cardMoved);
        simpleDelete(`${gameId}/${playerName}/hand/${idx}`);
    }

    const basicFunctions = {
        addBunny,
        addToBunny,
        addDolla,
        addSpecial,
        discard,
        discardCard,
        playRun,
        discardCarrot,
        changeMarket,
    };

    const currentPlayer = allPlayingCards.lizzie.id
        ? "lizzie"
        : allPlayingCards.marie.id
        ? "marie"
        : allPlayingCards.justin.id
        ? "justin"
        : "";

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
        <>
            <Col md={10}>
                <Row>
                    <Col>
                        <PlayingCard
                            card={allPlayingCards[currentPlayer] || playingCard}
                            idx={0}
                            basicFunctions={basicFunctions}
                            deck="playing"
                            allowOptions={
                                playerName ===
                                capitalizeFirstLetter(currentPlayer)
                            }
                        />
                        <div>
                            Playing : {capitalizeFirstLetter(currentPlayer)}
                        </div>
                    </Col>
                    <Col>
                        <Deck
                            card={{ cardType: "Deck" }}
                            title={`Deck : ${getLength(gameState.deck)} Cards`}
                            // actions={[{ actionTitle: "Draw", handleClick: draw }]}
                            doubleClick={() => draw()}
                            picture={`${
                                Object.entries(gameState.deck)[
                                    getLength(gameState.deck) - 1
                                ][1].deck
                            }.png`}
                        />
                    </Col>
                    <Col>
                        <Deck
                            card={{ cardType: "Market" }}
                            title={`Market`}
                            actions={[
                                {
                                    actionTitle: `Cabbage Card (${getLength(
                                        gameState.cabbageDeck
                                    )} Left)`,
                                    handleClick: drawCabbage,
                                },
                                {
                                    actionTitle: `Water Card (${getLength(
                                        gameState.waterDeck
                                    )} Left)`,
                                    handleClick: drawWater,
                                },
                                {
                                    actionTitle: `Carrot (${getLength(
                                        gameState.carrotDeck
                                    )} Left)`,
                                    handleClick: drawCarrot,
                                },
                            ]}
                            picture={`${gameState.market.deck}/${gameState.market.id}.png`}
                        />
                    </Col>

                    {/* Discard Deck */}
                    <DiscardDeck
                        deck={discardedDeck}
                        playerName={playerName}
                        gameId={gameId}
                        currentPlayer={currentPlayer}
                        playingCard={playingCard}
                    />

                    <Col>
                        <WinningCarrotDeck
                            winningCarrot={winningCarrot}
                            takeCard={takeCard}
                            smallCarrotDeck={smallCarrotDeck}
                            gameId={gameId}
                        />
                    </Col>
                </Row>
            </Col>
            <div style={{ padding: ".5em" }}></div>
            <Col md={12} style={{ backgroundColor: "lightgrey" }}>
                <Row>
                    <Col>
                        <div className="bunnyCircle_playerName">Justin</div>
                        <Row>
                            <DisplayCardsIcons
                                name={"bunnies"}
                                cards={bunnyCircle.justin}
                                player={"Justin"}
                                basicFunctions={basicFunctions}
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
                                basicFunctions={basicFunctions}
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
                                basicFunctions={basicFunctions}
                                playerName={playerName}
                            />
                        </Row>
                    </Col>
                </Row>
            </Col>
            <div style={{ padding: ".5em" }}></div>

            <Footer>
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
                                basicFunctions={basicFunctions}
                            />
                        </Row>
                    </Tab>
                    <Tab eventKey="dolla" title="Dolla">
                        <DisplayCardsIcons
                            name={"dolla"}
                            cards={dolla}
                            basicFunctions={basicFunctions}
                        />
                    </Tab>
                    <Tab eventKey="special" title="Special">
                        <DisplayCardsIcons
                            name={"special"}
                            cards={special}
                            basicFunctions={basicFunctions}
                        />
                    </Tab>
                    <Tab eventKey="carrots" title="Carrots">
                        <DisplayCardsIcons
                            name={"carrots"}
                            cards={carrots}
                            basicFunctions={basicFunctions}
                        />
                    </Tab>
                    <Tab eventKey="cabbageAndWater" title="Cabbage and Water">
                        <DisplayResources
                            cabbage={cabbage}
                            water={water}
                            player={playerName}
                        />
                    </Tab>
                    <Tab title="" tabClassName="workingTab"></Tab>

                    {players.map(
                        (player) =>
                            playerName !== capitalizeFirstLetter(player) && [
                                <Tab
                                    key={`${player}Dolla`}
                                    eventKey={`${player}Dolla`}
                                    title={`${capitalizeFirstLetter(
                                        player
                                    )}'s Dolla`}
                                    tabClassName={`${player}Tab`}
                                >
                                    <DisplayCardsIcons
                                        name={"dolla"}
                                        cards={otherDolla[player]}
                                        basicFunctions={basicFunctions}
                                        allowOptions={false}
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
                                        basicFunctions={basicFunctions}
                                        allowOptions={false}
                                    />
                                </Tab>,
                            ]
                    )}
                </Tabs>
            </Footer>
        </>
    );
}

export default Player;
