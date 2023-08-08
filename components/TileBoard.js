"use client";
import Tile from "./Tile";
import { useEffect, useState } from "react";

const TileBoard = () => {
    const findOpenPosition = (state) => {
        for (let i = 0; i < state.length; i++) {
            for (let j = 0; j < state[i].length; j++) {
                if (state[i][j] === -1) {
                    return [i, j];
                }
            }
        }
        return [-1, -1];
    }
    const isValidMove = (state, move) => {
        switch (move) {
            case "ArrowLeft":
                const [x, y] = findOpenPosition(state);
                if (y >= 0 && y < state[0].length - 1) {
                    return true;
                }
                return false;
            case "ArrowRight":
                break;
            case "ArrowUp":
                break;
            case "ArrowDown":
                break;
            default:
                return false;
        }
    }    
    const handleKeyPress = (e) => {
        console.log('yuhh', isValidMove(board, e.key));
    };
    const [board, setBoard] = useState([
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, -1],
    ]);
    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
    }, []);

    return (
        <div style={{paddingLeft: "45%", paddingRight: "45%",}}>
            {board.map((row, rowIdx) => {
                return (
                    <div key={rowIdx} style={{display: "flex", flexDirection: "row"}}>
                        {row.map((num, numIdx) => {
                            return (
                                <Tile key={numIdx} num={num}/>
                            );
                            
                        })}
                        <br/>
                    </div>
                )
            })}
            <button style={{display: "flex", justifyContent: "center", marginLeft: "22px", marginTop: "25px",}}>Get Solution</button>
        </div>
    )
};

export default TileBoard;