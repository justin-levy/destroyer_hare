import React from "react";
import { Card } from "react-bootstrap";

import { Menu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

import { simpleDelete } from "../_firebase/simpleCD";

const ResourceCard = ({ card, type, player, id, gameId }) => {
    if (!card) return;

    return (
        <Menu
            menuButton={
                <Card>
                    <Card.Body className="p-1">
                        <Card.Img src={`${type}.png`} />
                    </Card.Body>
                    <Card.Text children={card} />
                </Card>
            }
            transition
        >
            <MenuItem
                onClick={() =>
                    simpleDelete(`${gameId}/${player}/${type}/${id}`)
                }
            >
                Discard
            </MenuItem>
        </Menu>
    );
};

export default ResourceCard;