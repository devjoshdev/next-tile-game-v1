"use client";
import Tile from "./Tile";
import { useEffect, useState } from "react";

const TileBoard = ({scramble}) => {
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
                    console.log("setting board with move", move);
                    setBoard(oldBoard => newBoard);
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
                    console.log("setting board with move", move);
                    setBoard(oldBoard => newBoard);
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
                    console.log("setting board with move", move);
                    setBoard(oldBoard => newBoard);
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
                    console.log("setting board with move", move);
                    setBoard(oldBoard => newBoard);
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
    const reconstructPath = (node, currentMove, map) => {
        let solutionPath = [currentMove];
        let children = Array.from(map.keys());
        let parents = Array.from(map.values()); 
        while (currentMove !== "") {
            children.every(([state, move], idx) => {
                // console.log(state);
                // console.log(move);
                // console.log(idx);
                if (compareBoards(state, node)) {
                    node = parents[idx][0];
                    solutionPath.push(parents[idx][1]);
                    currentMove = parents[idx][1];
                    // console.log("current path", solutionPath);
                    return false;
                }
                else {
                    return true;
                }
            });
            // return;
        }
        return solutionPath.reverse();
    }
    const solveWithBFS = (state) => {
        let queue = [];
        let explored = new Set();
        let parent = new Map();
        queue.push([state, ""]);
        explored.add(state);
        while (queue.length !== 0) {
            let [node, currentMove] = queue.shift();
            // console.log("looking at node--------------------------------");
            // console.log(node);
            // console.log("--------------------------------");
            if (isGoalState(node)) {
                return reconstructPath(node, currentMove, parent);
            }
            ["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"].forEach(move => {
                if (isValidMove(node, move)) {
                    // console.log("performing move", move);
                    let neighbor = performMove(node, move, false);
                    if (!boardContained(neighbor, Array.from(explored.values()))) {
                       explored.add(neighbor);
                       parent.set([neighbor, move], [node, currentMove]);
                       queue.push([neighbor, move]); 
                    }
                    else {
                        // console.log("contained");
                    }
                }
            })
        }
        // console.log("hit the end!");
    }
    const findValueFromMap = (elem, map) => {
        let keys = Array.from(map.keys());
        let vals = Array.from(map.values());
        for (let i = 0; i < keys.length; i++) {
            if (compareBoards(keys[i], elem)) {
                return vals[i];
            }
        }
        return Infinity;
    }
    const findElement = (state, num) => {
        for (let i = 0; i < state.length; i++) {
            for (let j = 0; j < state[i].length; j++) {
                if (state[i][j] === num) {
                    return [i, j];
                }
            }
        }
        return [-1, -1];
    }
    const manhattanDistance = (state) => {
        let currentNum = 1;
        let mDistance = 0;
        for (let i = 0; i < state.length; i++) {
            for (let j = 0; j < state[i].length; j++) {
                const [foundX, foundY] = findElement(state, currentNum);
                mDistance += Math.abs(foundX - i);
                mDistance += Math.abs(foundY - j);
                currentNum === 15 ? currentNum = -1 : currentNum++;
            }
        }
        return mDistance;
    }
    const solveWithAStar = (state) => {
        let openSet = [];
        openSet.push([state, "", manhattanDistance(state)]);
        let cameFrom = new Map();
        let gScore = new Map();
        gScore.set(state, 0);
        let fScore = new Map();
        fScore.set(state, manhattanDistance(state));
        while (openSet.length !== 0) {
            let [currentNode, currentMove, currentFScore] = openSet.shift();
            if (isGoalState(currentNode)) {
                return reconstructPath(currentNode, currentMove, cameFrom);
            }
            ["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"].forEach(move => {
                if (isValidMove(currentNode, move)) {
                    let neighbor = performMove(currentNode, move, false);
                    let tentativeGScore = findValueFromMap(currentNode, gScore) + 1;
                    if (tentativeGScore < findValueFromMap(neighbor, gScore)) {
                        let newFScore = tentativeGScore + manhattanDistance(neighbor);
                        cameFrom.set([neighbor, move], [currentNode, currentMove]);
                        gScore.set(neighbor, tentativeGScore);
                        fScore.set(neighbor, newFScore);
                        if (!boardContained(neighbor, openSet.map(elem => elem[0]))) {
                            let indexForInsert;
                            for (indexForInsert = 0; indexForInsert < openSet.length; indexForInsert++) {
                                let [openSetBoard, openSetMove, openSetFScore] = openSet[indexForInsert];
                                if (newFScore < openSetFScore) {
                                    break;
                                }
                            }
                            openSet.splice(indexForInsert, 0, [neighbor, move, newFScore]);
                        }
                    }

                }
            });

        }
        // console.log("Did not find solution");
    }

    async function performSolution(method) {
        let solutionMoves;
        switch (method) {
            case "bfs":
                solutionMoves = solveWithBFS(board);
                break;
            case "astar":
                solutionMoves = solveWithAStar(board);
                break;
        }
        console.log("here is the solution", solutionMoves);
        let newBoard = board;
        for (let i = 1; i < solutionMoves.length; i++) {
            console.log("making my way downtown", solutionMoves[i]);
            newBoard = performMove(newBoard, solutionMoves[i], false);
            setBoard(oldBoard => newBoard);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    async function performSolutionHandler(method) {
        await performSolution(method, board, setBoard);
    }
    const scrambleBoard = (state) => {
        console.log("scrambling board");
        let numMoves = 10;
        let moves = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"];
        let myBoard = state;
        while (numMoves > 0) {
            let possibleMove = moves[(Math.floor(Math.random() * moves.length))];
            if (isValidMove(myBoard, possibleMove)) {
                myBoard = performMove(myBoard, possibleMove, false);
                numMoves--;
            }
        }
        return myBoard;
    };

    const [board, setBoard] = useState([[1, 2, 3, 4],[5, 6, 7, 8],[9, 10, 11, 12],[13, 14, 15, -1]]);
    useEffect(() => {
        if (scramble) {
            setBoard(scrambleBoard(board));
        }
    }, [])
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
            <button style={{display: "flex", justifyContent: "center", marginLeft: "8px", marginTop: "25px",}} onClick={() => {performSolutionHandler("bfs")}}>Get BFS Solution</button>
            <button style={{display: "flex", justifyContent: "center", marginLeft: "14px",}} onClick={() => {performSolutionHandler("astar");}}>Get A* Solution</button>
        </div>
    )
};

export default TileBoard;