import React from "react";
import { Card as BootstrapCard } from "react-bootstrap";

const Card = ({ img, onClick = () => {} }, text = "") => {
    return (
        <BootstrapCard onClick={onClick}>
            <BootstrapCard.Body className="p-1">
                <BootstrapCard.Img src={img}></BootstrapCard.Img>
            </BootstrapCard.Body>
            {/* {text !== "" && <BootstrapCard.Text>{text}</BootstrapCard.Text>} */}
        </BootstrapCard>
    );
};

export default Card;
