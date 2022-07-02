import React from "react";
import { Col, Row, Tabs, Tab } from "react-bootstrap";
import {
    GetBunnyCircle,
    GetPlayerState,
    GetPlayingCards,
} from "../_firebase/getData";
import { simpleDelete, simplePush, simpleUpdate } from "../_firebase/simpleCD";
import { Deck, PlayingCard, DisplayCardsIcons } from "./Card";
import { capitalizeFirstLetter, getLength } from "./utils";

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
    const { deck, carrotDeck, discardedDeck } = gameState;

    const playerState = GetPlayerState(gameId, playerName);
    // console.log(playerName, playerState);
    if (!playerState) return;

    const { hand, run, dolla, special, bunnies, carrots, playingCard } =
        playerState;

    const allPlayingCards = GetPlayingCards(gameId);
    const bunnyCircle = GetBunnyCircle(gameId);

    // useEffect(() => {
    //     console.log(discardedDeck);
    // }, [discardedDeck]);

    // useEffect(() => {
    //     console.log(playerState);
    // }, [playerState]);

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
    // const drawRemaining = async () => {
    //     console.log("Start");
    //     while (getLength(deck) > 0 && getLength(hand) + getLength(run) <= 6) {
    //         const data = takeCard("deck");
    //         simplePush(`${gameId}/${playerName}/hand/`, data[1]);
    //         await wait(300);
    //         console.log("runnning");
    //     }
    //     console.log("Finish");
    // };

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
        <Col md>
            <Row>
                <Col>
                    <PlayingCard
                        card={allPlayingCards[currentPlayer] || playingCard}
                        idx={0}
                        basicFunctions={basicFunctions}
                        deck="playing"
                        allowOptions={
                            playerName === capitalizeFirstLetter(currentPlayer)
                        }
                    />
                    <div>Playing : {capitalizeFirstLetter(currentPlayer)}</div>
                </Col>
                <Deck
                    card={{ cardType: "Deck" }}
                    title={`Deck : ${getLength(gameState.deck)} Cards`}
                    // actions={[{ actionTitle: "Draw", handleClick: draw }]}
                    doubleClick={() => draw()}
                    picture="blue.png"
                />

                {/* <Deck
                    card={{ cardType: "Carrots" }}
                    title={`Carrots : ${getLength(gameState.carrotDeck)} Cards`}
                /> */}

                <Deck
                    card={{ cardType: "Market" }}
                    title={`Market`}
                    actions={[
                        {
                            actionTitle: "Buy Cabbage Card",
                            handleClick: console.log,
                        },
                        {
                            actionTitle: "Buy Water Card",
                            handleClick: console.log,
                        },
                        {
                            actionTitle: `Buy Carrot (${getLength(
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
            </Row>
            <div style={{ padding: ".5em" }}></div>
            <Row>
                <Col>
                    <div>Justin</div>
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
                </Col>

                <Col>
                    <div>Lizzie</div>
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
                </Col>
                <Col>
                    <div>Marie</div>
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
                </Col>
            </Row>
            <div style={{ padding: ".5em" }}></div>

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
                                    picture="blue.png"
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
                <Tab eventKey="cabbageAndWater" title="Cabbage and Water"></Tab>
            </Tabs>
        </Col>
    );
}

export default Player;
