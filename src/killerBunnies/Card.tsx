import React from "react";
import { Menu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { Card } from "react-bootstrap";

function Cell({ card, idx, handleClick, color, title }) {
    const cardImg = card.id ? card.id : "1";

    return (
        <>
            <Menu
                menuButton={
                    /* <div
                            className="card"
                            key={idx}
                            style={{ backgroundColor: color }}
                            // onClick={() => handleClick(card)}
                        >
                            {title}
                        </div> */
                    <Card>
                        <Card.Body className="p-1">
                            {/* <Card.Title className="text-right padding-0">
                                {card.cardType.toUpperCase()} {card.id}
                            </Card.Title> */}
                            <Card.Img src={`/blue/${cardImg}.png`}></Card.Img>
                            {/* <Card.Subtitle className="mb-2 text-muted">
                                Card Subtitle
                            </Card.Subtitle>
                            <Card.Text>
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
                            </Card.Text>
                            <Card.Link href="#" className="text-left">
                                Card Link
                            </Card.Link> */}
                        </Card.Body>
                    </Card>
                }
                transition
            >
                <MenuItem>Run</MenuItem>
                <MenuItem>Discard</MenuItem>
            </Menu>
        </>
    );
}

export default Cell;
