"use client";
import Tile from "./Tile";
import { useEffect, useState } from "react";

const TileBoard = () => {
    const isGoalState = (state) => {
        const numRows = state.length;
        const numCols = state[0].length;
        const elements = numRows * numCols - 1 // last element should be open (-1)
        let counter = 1;
        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
                if (counter === elements) {
                    return true;
                }
                if (state[i][j] !== counter) {
                    return false;
                }
                counter++;
            }
        }
        return false; // should not be hit
    }
    const findOpenPosition = (state) => {
        for (let i = 0; i < state.length; i++) {
            for (let j = 0; j < state[i].length; j++) {
                if (state[i][j] === -1) {
                    return [i, j];
                }
            }
        }
        return [-1, -1]; // if this line gets hit, we got some serious issues
    }
    const isValidMove = (state, move) => {
        const [x, y] = findOpenPosition(state);
        switch (move) {
            case "ArrowLeft":
                if (y >= 0 && y < state[0].length - 1) {
                    return true;
                }
                return false;
            case "ArrowRight":
                if (y > 0 && y < state[0].length) {
                    return true;
                }
                return false;
            case "ArrowUp":
                if (x >= 0 && x < state.length - 1) {
                    return true;
                }
                return false;
            case "ArrowDown":
                if (x > 0 && x < state.length) {
                    return true;
                }
                return false;
            default:
                return false; // if this line gets hit, we got some serious issues
        }
    }
    const performMove = (state, move) => {
        const [xOpen, yOpen] = findOpenPosition(board);
        let newBoard = [];
        state.forEach(row => newBoard.push([...row]));
        switch (move) {
            case "ArrowLeft":
                let rightOfOpenPosition = newBoard[xOpen][yOpen + 1];
                newBoard[xOpen][yOpen + 1] = newBoard[xOpen][yOpen];
                newBoard[xOpen][yOpen] = rightOfOpenPosition;
                setBoard(newBoard);
                break;
            case "ArrowRight":
                let leftOfOpenPosition = newBoard[xOpen][yOpen - 1];
                newBoard[xOpen][yOpen - 1] = newBoard[xOpen][yOpen];
                newBoard[xOpen][yOpen] = leftOfOpenPosition;
                setBoard(newBoard);
                break;
            case "ArrowUp":
                let belowOpenPosition = newBoard[xOpen + 1][yOpen];
                newBoard[xOpen + 1][yOpen] = newBoard[xOpen][yOpen];
                newBoard[xOpen][yOpen] = belowOpenPosition;
                setBoard(newBoard);
                break;
            case "ArrowDown":
                let aboveOpenPosition = newBoard[xOpen - 1][yOpen];
                newBoard[xOpen - 1][yOpen] = newBoard[xOpen][yOpen];
                newBoard[xOpen][yOpen] = aboveOpenPosition;
                setBoard(newBoard);
                break;
            default:
                alert("Something went wrong!"); // if this line gets hit, we got some serious issues
        }
    }    

    const [board, setBoard] = useState([
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, -1],
    ]);
    useEffect(() => {
        const handleKeyPress = (e) => {
            // console.log('yuhh', isValidMove(board, e.key));
            // if the move is valid, make it knoiw
            if (isValidMove(board, e.key)) {
                performMove(board, e.key);
            }
        };
        window.addEventListener("keydown", handleKeyPress); 
        return () => window.removeEventListener("keydown", handleKeyPress)
    }, [board]);
    console.log("board", board);
    console.log("is goal state?", isGoalState(board));
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