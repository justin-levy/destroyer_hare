import React from "react";

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

export default Footer;
