const canvas = document.getElementById('treeCanvas');
const ctx = canvas.getContext('2d');

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this._insertNode(this.root, newNode);
        }
        this.draw();
    }

    _insertNode(node, newNode) {
        if (newNode.value < node.value) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this._insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this._insertNode(node.right, newNode);
            }
        }
    }

    delete(value) {
        this.root = this._deleteNode(this.root, value);
        this.draw();
    }

    _deleteNode(node, value) {
        if (node === null) return null;
        
        if (value < node.value) {
            node.left = this._deleteNode(node.left, value);
        } else if (value > node.value) {
            node.right = this._deleteNode(node.right, value);
        } else {
            if (node.left === null) return node.right;
            else if (node.right === null) return node.left;

            node.value = this._minValueNode(node.right).value;
            node.right = this._deleteNode(node.right, node.value);
        }
        return node;
    }

    _minValueNode(node) {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current;
    }

    search(value) {
        return this._searchNode(this.root, value);
    }

    _searchNode(node, value) {
        if (node === null) return false;
        if (value < node.value) {
            return this._searchNode(node.left, value);
        } else if (value > node.value) {
            return this._searchNode(node.right, value);
        } else {
            return true;
        }
    }

    draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (this.root) {
            this._drawNode(this.root, canvas.width / 2, 50, canvas.width / 4);
        }
    }

    _drawNode(node, x, y, offset) {
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, 2 * Math.PI);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.strokeText(node.value, x - 5, y + 5);
        ctx.stroke();

        if (node.left) {
            ctx.moveTo(x, y);
            ctx.lineTo(x - offset, y + 50);
            ctx.stroke();
            this._drawNode(node.left, x - offset, y + 50, offset / 2);
        }

        if (node.right) {
            ctx.moveTo(x, y);
            ctx.lineTo(x + offset, y + 50);
            ctx.stroke();
            this._drawNode(node.right, x + offset, y + 50, offset / 2);
        }
    }
}

const binaryTree = new BinaryTree();

function addNode() {
    const value = parseInt(document.getElementById('nodeValue').value);
    if (!isNaN(value)) {
        binaryTree.insert(value);
    }
}

function deleteNode() {
    const value = parseInt(document.getElementById('nodeValue').value);
    if (!isNaN(value)) {
        binaryTree.delete(value);
    }
}

function searchNode() {
    const value = parseInt(document.getElementById('nodeValue').value);
    if (!isNaN(value)) {
        const found = binaryTree.search(value);
        alert(found ? 'Node found!' : 'Node not found.');
    }
}
