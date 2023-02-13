/** Node: node for a singly linked list. */

class Node {
	constructor(val) {
		this.val = val;
		this.next = null;
	}
}

/** LinkedList: chained together nodes. */

class LinkedList {
	constructor(vals = []) {
		this.head = null;
		this.tail = null;
		this.length = 0;

		for (let val of vals) this.push(val);
	}

	/** push(val): add new value to end of list. */

	push(val) {
		// Create the new node
		const newNode = new Node(val);

		// If it's the first node, then the newNode should be the head and the tail
		if (!this.head) {
			this.head = newNode;
		}

		// If a tail already exists, point it to the newNode
		if (this.tail) this.tail.next = newNode;

		// Set the newNode as the tail
		this.tail = newNode;

		// Increment the LinkedList length
		this.length++;
	}

	/** unshift(val): add new value to start of list. */

	unshift(val) {
		// Create the newNode
		const newNode = new Node(val);

		// If it's the first node, then the newNode should be the head and the tail
		if (!this.tail) {
			this.tail = newNode;
		}

		// If a head already exists, the newNode should point to it
		if (this.head) {
			newNode.next = this.head;
		}

		// Set the newNode as the head
		this.head = newNode;

		// Increment the LinkedList lenght
		this.length++;
	}

	/** pop(): return & remove last item. */

	pop() {
		// Short circuit if there is no nodes to remove
		if (this.length === 0) return;

		// Retrieve the last value to be returned
		const val = this.tail.val;

		// Traverse to the penultimate node
		let node = this.head;
		while (node.next && node.next !== this.tail) {
			node = node.next;
		}

		// Decouple the last node
		if (this.length > 1) {
			node.next = null;
			this.tail = node;
		} else {
			this.tail = null;
			this.head = null;
		}

		// Decrement the LinkedList length
		this.length--;

		// Return the value of removed node
		return val;
	}

	/** shift(): return & remove first item. */

	shift() {
		// Short circuit if there are no nodes
		if (this.length === 0) return;

		// Retrieve the first value to return
		const val = this.head.val;

		// If there is only one node, set the head and tail to null
		// If there are more nodes, set the head to the second node
		if (this.length > 1) {
			this.head = this.head.next;
		} else {
			this.head = null;
			this.tail = null;
		}

		// Decrement the LinkedList length
		this.length--;

		// Return the value of the removed nod
		return val;
	}

	/** getAt(idx): get val at idx. */

	getAt(idx) {
		// Short circuit if the idx is out of LinkedList range
		if (idx >= this.length) return;

		// Traverse to the idx
		let count = 0;
		let node = this.head;
		while (count < idx) {
			node = node.next;
			count++;
		}

		// Return the value
		return node.val;
	}

	/** setAt(idx, val): set val at idx to val */

	setAt(idx, val) {
		// Short circuit if the idx is out of LinkedList range
		if (idx >= this.length) return;

		// Traverse to the idx
		let count = 0;
		let node = this.head;
		while (count < idx) {
			node = node.next;
			count++;
		}

		node.val = val;
	}

	/** insertAt(idx, val): add node w/val before idx. */
	insertAt(idx, val) {
		// Short circuit if the idx is out of LinkedList range
		if (idx > this.length) return;

		// Push val if the LinkedList is empty, or if the idx equals the length
		if (this.length === 0 || idx === this.length) {
			this.push(val);
			return;
		}

		// Unshift val if idx is 0
		if (idx === 0) {
			this.unshift(val);
			return;
		}

		// Create the newNode
		const newNode = new Node(val);

		// Traverse to the node before the idx
		let count = 0;
		let node = this.head;
		while (count < idx - 1) {
			node = node.next;
			count++;
		}

		// Retrieve the nodes on either side of insert point
		const prevNode = node;
		const nextNode = node.next;

		// Insert the node
		prevNode.next = newNode;
		newNode.next = nextNode;

		this.length++;
	}

	/** removeAt(idx): return & remove item at idx, */

	removeAt(idx) {
		// Short circuit if the idx is out of LinkedList range
		if (idx > this.length) return;

		// Shift if the idx is 0
		if (idx === 0) {
			return this.shift();
		}

		// Pop if the idx refers to the last node
		if (idx === this.length - 1) {
			return this.pop();
		}

		// Traverse to the node before the idx
		let count = 0;
		let node = this.head;
		while (count < idx - 1) {
			node = node.next;
			count++;
		}

		// Retrieve nodes
		const prevNode = node;
		const currNode = node.next;
		const nextNode = node.next.next;

		// Remove the currNode
		prevNode.next = nextNode;

		// Decrement the length
		this.length--;

		return currNode;
	}

	/** average(): return an average of all values in the list */

	average() {
		// Short circuit if the idx is out of LinkedList range
		if (this.length === 0) return 0;

		// Traverse the LinkedList and sum values
		let node = this.head;
		let sum = this.head.val;
		while (node.next) {
			sum += node.next.val;
			node = node.next;
		}

		// Calculate the average
		const average = sum / this.length;

		return average;
	}
}

module.exports = LinkedList;
