"use client";
const padElem = (elem) => {
    if (elem.length === 0) return "\u00A0\u00A0\u00A0\u00A0";
    return elem.length === 2 ? elem : "\u00A0" + elem + "\u00A0";
};

const Tile = ({num}) => {
    return (
        <>
        <p style={{padding: "5px", border: "1px solid", margin: "2px"}}>{num === -1 ? padElem("") : padElem(num.toString())}</p>
        </>
    )
};

export default Tile;