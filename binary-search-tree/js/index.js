; (function () {

    const Queue = function () {
        const list = [],
            enQueue = data => list.push(data),
            deQueue = () => list.shift(),
            viewQueue = () => '(tail) ' + [...list].reverse().join(' -> ') + ' (head)',
            isEmpty = () => !!list.length;
        return Object.freeze({
            enQueue,
            deQueue,
            viewQueue,
            isEmpty
        });
    }

    /**
     * function to create tree node
     * @param {*} data
     */
    const Node = function (data = null) {
        this.data = data;
        this.left = null;
        this.right = null;
    }

    const BinarySearchTree = function () {
        let root = null;
        let traversalResult = [];

        // function to insert node in the tree
        const insert = data => {
            const node = new Node(data);
            // if root node exists traverse through the root to find the location to insert
            // otherwise assign the node to the root
            root ? insertNode(root, node) : root = node;
        }

        // helper function to locate the node position to insert in the tree
        const insertNode = (parentNode, node) => {
            // check if the node data is less than the parent node data
            if (node.data < parentNode.data) {
                // then handle left
                // check if left node is not available, then locate the node as the left node
                // otherwise traverse throught the left path
                if (parentNode.left === null) {
                    parentNode.left = node;
                } else {
                    insertNode(parentNode.left, node)
                }
            } else {
                // then handle right
                // check if right node is not available, then locate the node as the right node
                // otherwise traverse throught the right path
                if (parentNode.right === null) {
                    parentNode.right = node;
                } else {
                    insertNode(parentNode.right, node)
                }
            }
        }

        // function to remove the node with data in argument and updates the root node
        const remove = data => {
            root = removeNode(root, data);
        }

        // helper function to locate the node matching the data and remove and update the branch
        const removeNode = (parentNode, data) => {
            if (parentNode === null) {
                return parentNode;
            } else if (data < parentNode.data) {
                parentNode.left = removeNode(parentNode.left, data);
                return parentNode;
            } else if (data > parentNode.data) {
                parentNode.right = removeNode(parentNode.right, data);
                return parentNode;
            } else {
                const { left, right } = parentNode;
                if (left === null && right === null) {
                    parentNode = null;
                    return parentNode;
                }

                if (left === null) {
                    parentNode = parentNode.right;
                    return parentNode;
                } else if (right === null) {
                    parentNode = parentNode.left;
                    return parentNode;
                }

                // find minRightNode value and replace the parentNode value with that
                const minRightNode = findMinNode(parentNode.right);
                parentNode.data = minRightNode.data;
                // then remove the minRightNode from the right sub tree
                parentNode.right = removeNode(parentNode.right, minRightNode.data);
                return parentNode;
            }
        }

        //  finds the minimum node in tree
        // searching starts from given node
        const findMinNode = node => {
            // if left of a node is null
            // then it must be minimum node
            if (node.left === null)
                return node;
            else
                return findMinNode(node.left);
        }

        // function to search for a node with given data
        const search = (data, parentNode = root) => {
            // if trees is empty return null
            if (parentNode === null) {
                return null;
            }
            // if data is less than node's data
            // move left
            else if (data < parentNode.data) {
                return search(parentNode.left, data);
            }
            // if data is less than node's data
            // move left
            else if (data > parentNode.data) {
                return search(parentNode.right, data);
            }
            // if data is equal to the node data
            // return parentNode
            else {
                return parentNode;
            }
        }

        // returns root of the tree
        const getRootNode = () => root;

        const traversalMode = {
            'inorder': Symbol('inorder'),
            'preorder': Symbol('preorder'),
            'postorder': Symbol('postorder')
        };

        const inOrderTraversal = (node) => {
            if (node !== null) {
                inOrderTraversal(node.left);
                traversalResult.push(node.data);
                inOrderTraversal(node.right);
            }
        }

        const preOrderTraversal = (node) => {
            if (node !== null) {
                traversalResult.push(node.data);
                preOrderTraversal(node.left);
                preOrderTraversal(node.right);
            }
        }

        const postOrderTraversal = (node) => {
            if (node !== null) {
                postOrderTraversal(node.left);
                postOrderTraversal(node.right);
                traversalResult.push(node.data);
            }
        }

        /**
         * function to traverse tree via depth first algorithm - inorder [L, V, R], preorder [V, L, R] and postorder [L, R, V]
         * @param {*} mode
         * @param {*} node
         */
        const traversal = (mode = traversalMode.inorder, node = root) => {
            traversalResult = [];
            switch (mode) {
                case traversalMode.inorder:
                    inOrderTraversal(node);
                    break;
                case traversalMode.preorder:
                    preOrderTraversal(node);
                    break;
                case traversalMode.postorder:
                    postOrderTraversal(node);
                    break;
            }
            return traversalResult.join(' -> ');
        }
        /**
         * function to find the node via breadth first algorithm
         * @param {*} data
         * @param {*} node
         */
        const breadthFirstTraversal = (data = null) => {
            // initializting empty queue
            const result = [];
            const queue = new Queue();
            queue.enQueue(root);
            while (queue.isEmpty()) {
                // Remove the currentNode from the queue.
                const currentNode = queue.deQueue();
                result.push(currentNode.data);
                if (currentNode.data === data) {
                    return result.join(' -> ');
                } else {
                    // If currentNode has a left child node, add it to the queue.
                    if (currentNode.left !== null) {
                        queue.enQueue(currentNode.left)
                    }
                    // If currentNode has a right child node, add it to the queue.
                    if (currentNode.right !== null) {
                        queue.enQueue(currentNode.right)
                    }
                }
            }
            return result.join(' -> ');
        }

        return Object.freeze({
            insert,
            remove,
            getRootNode,
            search,
            traversalMode,
            traversal,
            breadthFirstTraversal
        });
    }

    const bst = new BinarySearchTree();
    console.log('Inserting nodes to the BinarySearchTree');
    bst.insert(15);
    bst.insert(25);
    bst.insert(10);
    bst.insert(7);
    bst.insert(22);
    bst.insert(17);
    bst.insert(13);
    bst.insert(5);
    bst.insert(9);
    bst.insert(27);
    console.log('tree result after insertion');
    console.log(JSON.stringify(bst.getRootNode(), 0, 4));
    console.log('breath first traversal path');
    console.log(bst.breadthFirstTraversal());
    console.log('inorder traversal from root node');
    console.log(bst.traversal(bst.traversalMode.inorder));
    console.log('preorder traversal from root node');
    console.log(bst.traversal(bst.traversalMode.preorder));
    console.log('postorder traversal from root node');
    console.log(bst.traversal(bst.traversalMode.postorder));

    console.log('Removing node with no children - 5');
    bst.remove(5);
    console.log('inorder traversal from root node after removing 5');
    console.log(bst.traversal(bst.traversalMode.inorder));

    console.log('Removing node with one children - 7');
    bst.remove(7);
    console.log('inorder traversal from root node after removing 7');
    console.log(bst.traversal(bst.traversalMode.inorder));

    console.log('Removing node with two children - 15');
    bst.remove(15);
    console.log('inorder traversal from root node after removing 15');
    console.log(bst.traversal(bst.traversalMode.inorder));
    console.log('preorder traversal from root node after removing 15');
    console.log(bst.traversal(bst.traversalMode.preorder));
    console.log('postorder traversal from root node after removing 15');
    console.log(bst.traversal(bst.traversalMode.postorder));
    console.log('tree result after removing 5, 7 and 15');
    console.log(JSON.stringify(bst.getRootNode(), 0, 4));
})();