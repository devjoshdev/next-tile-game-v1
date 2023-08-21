"use client";
import { useState, useEffect } from "react";
const padElem = (elem) => {
    if (elem.length === 0) return "\u00A0\u00A0\u00A0\u00A0";
    return elem.length === 2 ? elem : "\u00A0" + elem + "\u00A0";
};

const Tile = ({num}) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      setVisible(true);
    }, []);
    return (
        <>
        <p style={{padding: "5px", border: "1px solid", margin: "2px", opacity: visible ? 1 : 0, transition: "opacity 2s ease-in-out",}}>{num === -1 ? padElem("") : padElem(num.toString())}</p>
        </>
    )
};

export default Tile;