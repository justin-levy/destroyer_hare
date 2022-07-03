import React from "react";
import { Col, Row, Tabs, Tab } from "react-bootstrap";
import {
    GetBunnyCircle,
    GetDolla,
    GetPlayerState,
    GetPlayingCards,
    GetSpecial,
} from "../_firebase/getData";
import { simpleDelete, simplePush, simpleUpdate } from "../_firebase/simpleCD";
import { Deck, PlayingCard, DisplayCardsIcons, DisplayResources } from "./Card";
import { capitalizeFirstLetter, getLength } from "./utils";

const players = ["lizzie", "marie", "justin"];

const emptyPlayingCard = {
    id: 0,
};

const footerStyle = {
    backgroundColor: "grey",
    color: "white",
    borderTop: "1px solid #E7E7E7",
    paddingLeft: "20px",
    paddingRight: "40px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "300px",
    width: "100%",
    zIndex: "100",

    // flex: "1",
    // display: "flex",
    overflow: "auto",
};

const phantomStyle = {
    display: "block",
    padding: "20px",
    height: "400px",
    width: "100%",
};

function Footer({ children }) {
    return (
        <div>
            <div style={phantomStyle} />
            <div style={footerStyle}>{children}</div>
        </div>
    );
}

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

    function takeFromDiscardPile() {
        if (
            getLength(discardedDeck) > 0 &&
            getLength(hand) + getLength(run) <= 6
        ) {
            const data = takeCard("discardedDeck");
            simplePush(`${gameId}/${playerName}/hand/`, data[1]);
        }
    }

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

    function getWinningCarrot() {
        if (getLength(smallCarrotDeck) > 0) {
            const data = takeCard("smallCarrotDeck");
            simpleUpdate(`${gameId}/gameState/`, "winningCarrot", data);
        }
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
                    <Deck
                        card={{ cardType: "Deck" }}
                        title={`Deck : ${getLength(gameState.deck)} Cards`}
                        // actions={[{ actionTitle: "Draw", handleClick: draw }]}
                        doubleClick={() => draw()}
                        picture="blue.png"
                    />

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

                    <Deck
                        card={{ cardType: "Discarded" }}
                        title={`Discarded Cards : ${
                            gameState.discardedDeck
                                ? getLength(gameState.discardedDeck)
                                : 0
                        } Cards`}
                        actions={[
                            {
                                actionTitle: "Draw",
                                handleClick: takeFromDiscardPile,
                            },
                        ]}
                        picture={
                            gameState.discardedDeck &&
                            getLength(gameState.discardedDeck)
                                ? `blue/${
                                      Object.entries(gameState.discardedDeck)[
                                          getLength(gameState.discardedDeck) - 1
                                      ][1].id
                                  }.png`
                                : ``
                        }
                    />
                    {console.log(winningCarrot)}
                    <Deck
                        card={{ cardType: "Carrots" }}
                        title={
                            winningCarrot
                                ? getLength(smallCarrotDeck)
                                    ? `${getLength(smallCarrotDeck)} Left`
                                    : "Winner!"
                                : `Carrots for Winning`
                        }
                        actions={[
                            {
                                actionTitle: "End Game",
                                handleClick: getWinningCarrot,
                            },
                        ]}
                        picture={
                            winningCarrot
                                ? `blue/${winningCarrot[1].id}.png`
                                : `smallCarrot.png`
                        }
                    />
                </Row>
            </Col>
            <div style={{ padding: ".5em" }}></div>
            <Col md={12}>
                <Row>
                    <Col>
                        <div>Justin</div>
                        <Row>
                            <DisplayCardsIcons
                                name={"bunnies"}
                                cards={bunnyCircle.justin}
                                player={"Justin"}
                                basicFunctions={basicFunctions}
                                // allowOptions={
                                //     playerName === "Justin" ||
                                //     playerName === currentPlayer
                                // }
                            />
                        </Row>
                    </Col>

                    <Col>
                        <div>Lizzie</div>
                        <Row>
                            <DisplayCardsIcons
                                name={"bunnies"}
                                cards={bunnyCircle.lizzie}
                                player={"Lizzie"}
                                basicFunctions={basicFunctions}
                                // allowOptions={
                                //     playerName === "Lizzie" ||
                                //     playerName === currentPlayer
                                // }
                            />
                        </Row>
                    </Col>
                    <Col>
                        <div>Marie</div>
                        <Row>
                            <DisplayCardsIcons
                                name={"bunnies"}
                                cards={bunnyCircle.marie}
                                player={"Marie"}
                                basicFunctions={basicFunctions}
                                // allowOptions={
                                //     playerName === "Marie" ||
                                //     playerName === currentPlayer
                                // }
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
