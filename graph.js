export class Graph {
	constructor() {
		this.nodes = {};
		this.edges = {};
	}

	addNode(node) {
		if (!this.nodes[node]) {
			this.nodes[node] = {};
			this.edges[node] = {};
		}
	}

	removeNode(node) {
		if (this.nodes[node]) {
			delete this.nodes[node];
			delete this.edges[node];
			for (const neighbor in this.edges) {
				if (this.edges[neighbor][node]) {
					delete this.edges[neighbor][node];
				}
			}
		}
	}

	addEdge(node1, node2, weight = 1) {
		if (this.nodes[node1] && this.nodes[node2]) {
			this.edges[node1][node2] = weight;
			this.edges[node2][node1] = weight; 
		}
	}

	removeEdge(node1, node2) {
		if (this.edges[node1] && this.edges[node1][node2]) {
			delete this.edges[node1][node2];
			delete this.edges[node2][node1];
		}
	}

	getNeighbors(node) {
		return Object.keys(this.edges[node]);
	}

	getEdges(node) {
		return this.edges[node];
	}

	getWeight(node1, node2) {
		return this.edges[node1][node2];
	}

	isConnected(node1, node2) {
		return this.edges[node1] && this.edges[node1][node2];
	}

	dfs(node, visited = {}) {
		visited[node] = true;
		for (const neighbor in this.edges[node]) {
			if (!visited[neighbor]) {
				this.dfs(neighbor, visited);
			}
		}
	}

	bfs(node) {
		const queue = [node];
		const visited = {};
		while (queue.length > 0) {
			const currentNode = queue.shift();
			visited[currentNode] = true;
			for (const neighbor in this.edges[currentNode]) {
				if (!visited[neighbor]) {
					queue.push(neighbor);
				}
			}
		}
	}

	// Get the shortest path between two nodes using Dijkstra's algorithm
	dijkstra(node1, node2) {
		const distances = {};
		const previous = {};
		const queue = [node1];
		distances[node1] = 0;
		while (queue.length > 0) {
			const currentNode = queue.shift();
			for (const neighbor in this.edges[currentNode]) {
				const distance = distances[currentNode] + this.getWeight(currentNode, neighbor);
				if (!distances[neighbor] || distance < distances[neighbor]) {
					distances[neighbor] = distance;
					previous[neighbor] = currentNode;
					if (!queue.includes(neighbor)) {
						queue.push(neighbor);
					}
				}
			}
		}
		const path = [];
		let currentNode = node2;
		while (currentNode !== node1) {
			path.unshift(currentNode);
			currentNode = previous[currentNode];
		}
		path.unshift(node1);
		return path;
	}

}