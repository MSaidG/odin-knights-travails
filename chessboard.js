import {p, ps} from './printer.js';
import {Graph} from './graph.js';


let chessboard = createChessboard()
let graph = new Graph()

loopChessboardToAddVertex()
loopChessboardToAddEdges()

function createChessboard() {
	let chessboard = []
	for (let i = 0; i < 8; i++) {
		chessboard.push([])
		for (let j = 0; j < 8; j++) {
			chessboard[i].push([i + 1, j + 1])
		}
	}
	return chessboard
}

function loopChessboardToAddVertex(arr) {
	for (let i = 0; i < 8; i++) {
		for (let j = 0; j < 8; j++) {
			graph.addNode(chessboard[i][j])
		}
	}
}

function loopChessboardToAddEdges(arr) {
	for (let i = 0; i < 8; i++) {
		for (let j = 0; j < 8; j++) {
			checkPossiblePaths(chessboard, chessboard[i][j])
		}
	}
}

function checkPath(chessboard, pos) {	
	if (pos[0] < 1 || pos[1] < 1 || pos[0] > 8 || pos[1] > 8) {
		return false
	}
	return true
}

function checkPossiblePaths(chessboard, pos) {	
	let possiblePaths = []
	possiblePaths.push([pos[0] + 1, pos[1] + 2])
	possiblePaths.push([pos[0] + 2, pos[1] + 1])
	possiblePaths.push([pos[0] + 2, pos[1] - 1])
	possiblePaths.push([pos[0] + 1, pos[1] - 2])
	possiblePaths.push([pos[0] - 1, pos[1] - 2])
	possiblePaths.push([pos[0] - 2, pos[1] - 1])
	possiblePaths.push([pos[0] - 2, pos[1] + 1])
	possiblePaths.push([pos[0] - 1, pos[1] + 2])

	for (let i = 0; i < possiblePaths.length; i++) {
		if (checkPath(chessboard, possiblePaths[i])) {
			graph.addEdge(pos, possiblePaths[i])
		}
	}
}




function moveKnight(startPos, endPos) {
	if (!(checkPath(chessboard, startPos) && checkPath(chessboard, endPos))) {
		throw new Error("Make sure positions are valid and they are not off th board!")
	}
	let paths = graph.dijkstra(startPos, endPos)
	p(`   >  knightMoves(${startPos},${endPos})`)
	p(`  =>  You made it in ${paths.length-1} moves!  Here's your path:\n`)
	paths.slice(1).forEach(a => function() {
		ps("  --->[" + a + "] ")
	}())
}
p("\n\nMOVE")
moveKnight([8,1], [1,8])
p("\n\nMOVE")
moveKnight([1,1], [4,4])
p("\n\nMOVE")
moveKnight([1,1], [8,9])