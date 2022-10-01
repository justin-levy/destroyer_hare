import React from "react";
import { Card, Col } from "react-bootstrap";

import { Menu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

export function Deck({ card, title, picture, actions, doubleClick }) {
    const handleMultiClicks = (e) => {
        switch (e.detail) {
            case 1:
                // console.log("click");
                break;
            case 2:
                doubleClick();
                break;
            default:
                return;
        }
    };

    return (
        <>
            <Col>
                {actions ? (
                    <Menu
                        menuButton={
                            <Card>
                                <Card.Body className="p-1">
                                    <Card.Img src={picture}></Card.Img>
                                </Card.Body>
                            </Card>
                        }
                        transition
                    >
                        {actions.map((action, idx) => (
                            <MenuItem
                                key={idx}
                                onClick={() => action.handleClick(card)}
                            >
                                {action.actionTitle}
                            </MenuItem>
                        ))}
                    </Menu>
                ) : (
                    <Card onClick={handleMultiClicks}>
                        <Card.Body className="p-1">
                            <Card.Img src={picture}></Card.Img>
                        </Card.Body>
                    </Card>
                )}
                <div style={{ textAlign: "left" }}>{title}</div>
            </Col>
        </>
    );
}
