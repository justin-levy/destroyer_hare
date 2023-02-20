import React from "react";
import { Card } from "react-bootstrap";

import { Menu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

export function DeckWithMenu({ card, title, picture, actions }) {
    return (
        <>
            <Menu
                menuButton={
                    <Card>
                        <Card.Body className="p-1">
                            <Card.Img src={picture} />
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

            <div style={{ textAlign: "left" }}>{title}</div>
        </>
    );
}
