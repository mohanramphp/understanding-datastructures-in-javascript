(function () {
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
            root ? insertNode(root, node) : root = node;
        }

        // helper function to locate the node position to insert in the tree
        const insertNode = (parentNode, node) => {
            if (node.data < parentNode.data) {
                if (parentNode.left === null) {
                    parentNode.left = node;
                } else {
                    insertNode(parentNode.left, node)
                }
            } else {
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
        // this method uses depth first algorithm
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

        return Object.freeze({
            insert,
            remove,
            traversal,
            traversalMode,
            getRootNode,
            search
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