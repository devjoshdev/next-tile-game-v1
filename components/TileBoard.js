"use client";
import Tile from "./Tile";
import { useEffect, useState } from "react";

const TileBoard = () => {
    const isGoalState = (state) => {  
        const numRows = state.length;
        const numCols = state[0].length;
        const elements = numRows * numCols
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
    const performMove = (state, move, updateGUI=true) => {
        const [xOpen, yOpen] = findOpenPosition(state);
        let newBoard = [];
        state.forEach(row => newBoard.push([...row]));
        switch (move) {
            case "ArrowLeft":
                let rightOfOpenPosition = newBoard[xOpen][yOpen + 1];
                newBoard[xOpen][yOpen + 1] = newBoard[xOpen][yOpen];
                newBoard[xOpen][yOpen] = rightOfOpenPosition;
                if (updateGUI) {
                    setBoard(newBoard);
                }
                else {
                    return newBoard;
                }
                break;
            case "ArrowRight":
                let leftOfOpenPosition = newBoard[xOpen][yOpen - 1];
                newBoard[xOpen][yOpen - 1] = newBoard[xOpen][yOpen];
                newBoard[xOpen][yOpen] = leftOfOpenPosition;
                if (updateGUI) {
                    setBoard(newBoard);
                }
                else {
                    return newBoard;
                }
                break;
            case "ArrowUp":
                let belowOpenPosition = newBoard[xOpen + 1][yOpen];
                newBoard[xOpen + 1][yOpen] = newBoard[xOpen][yOpen];
                newBoard[xOpen][yOpen] = belowOpenPosition;
                if (updateGUI) {
                    setBoard(newBoard);
                }
                else {
                    return newBoard;
                }
                break;
            case "ArrowDown":
                let aboveOpenPosition = newBoard[xOpen - 1][yOpen];
                newBoard[xOpen - 1][yOpen] = newBoard[xOpen][yOpen];
                newBoard[xOpen][yOpen] = aboveOpenPosition;
                if (updateGUI) {
                    setBoard(newBoard);
                }
                else {
                    return newBoard;
                }
                break;
            default:
                alert("Something went wrong!"); // if this line gets hit, we got some serious issues
        }
    }

    const compareBoards = (state1, state2) => {
        let rows1 = state1.length;
        let rows2 = state2.length;
        let cols1 = state1[0].length;
        let cols2 = state2[0].length;
        if (rows1 !== rows2 || cols1 !== cols2) {
            return false;
        }
        for (let i = 0; i < rows1; i++) {
            for (let j = 0; j < cols1; j++) {
                if (state1[i][j] !== state2[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }

    const boardContained = (needle, haystack) => {
        haystack.forEach(bale => {
            if (compareBoards(needle, bale)) {
                return true;
            }
        });
        return false;
    }

    const solveWithBFS = (state) => {
        // TODO: make a Node class, it should have state, move and an equals(o) implementation and refactor this to use it 
        let queue = [];
        let explored = new Set();
        let parent = new Map();
        queue.push([state, ""]);
        explored.add(state);
        while (queue.length !== 0) {
            let [node, currentMove] = queue.shift();
            console.log("looking at node--------------------------------");
            console.log(node);
            console.log("--------------------------------");
            if (isGoalState(node)) {
                return [node, parent];
            }
            ["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"].forEach(move => {
                if (isValidMove(node, move)) {
                    console.log("performing move", move);
                    let neighbor = performMove(node, move, false);
                    if (!boardContained(neighbor, Array.from(explored.values()))) {
                       explored.add(neighbor);
                       parent.set([neighbor, move], [node, currentMove]);
                       queue.push([neighbor, move]); 
                    }
                    else {
                        console.log("contained");
                    }
                }
            })
        }
        console.log("hit the end!");
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
    // console.log("board", board);
    // console.log("is goal state?", isGoalState(board));
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
            <button style={{display: "flex", justifyContent: "center", marginLeft: "22px", marginTop: "25px",}} onClick={() => {console.log(solveWithBFS(board));}}>Get Solution</button>
        </div>
    )
};

export default TileBoard;