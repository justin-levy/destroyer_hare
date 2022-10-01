import React from "react";
import { Card } from "react-bootstrap";

import { Menu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { simpleDelete } from "../_firebase/simpleCD";

export function ResourceCard({ card, type, player, id }) {
    if (!card) return;

    return (
        <Menu
            menuButton={
                <Card>
                    <Card.Body className="p-1">
                        <Card.Img src={`${type}.png`}></Card.Img>
                    </Card.Body>
                    <Card.Text>{card}</Card.Text>
                </Card>
            }
            transition
        >
            <MenuItem
                onClick={() => simpleDelete(`12345/${player}/${type}/${id}`)}
            >
                Discard
            </MenuItem>
        </Menu>
    );
}
