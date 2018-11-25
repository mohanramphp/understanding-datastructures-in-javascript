# Binary Search Tree DataStructure #

In this section, we will be learning binary search tree datastructure.

![Linked List Figure](https://raw.githubusercontent.com/mohanramphp/understanding-datastructures-in-javascript/master/binary-search-tree/images/binary-search-tree.png)


> A Binary Search tree is a binary tree in which nodes which have lesser value are stored on the left while the nodes with higher value are stored at the right

Each tree node consists of three things they are
1. data
2. left - pointer to the left tree node
3. right - pointer to the right tree node

**_Data_** holds the data value of the tree node.
**_Pointer_** holds the reference to the memory location of left/right tree node.

We would discuss on the following features like
* insert node
* remove node
* get root node
* search
* traversalMode - **inorder, preorder, postorder**
* tree traversal
    * depth first traversal
        * inorder (Left, Visit, Right)
        * preorder (Visit, Left, Right)
        * postorder (Left, Right, Visit)
    * breadth first traversal


# Insert Node #

In binary search tree, we can insert the node with the following guidelines/logic. before that, let see the signature of the insert method

### Signature
```javascript
    const bst = new BinarySearchTree();
    // signature of the insert method is
    bst.insert(15);
```

### Logic:
1. create a tree node object with the input data.
2. check if root node exists on the tree, if yes search through the root node to find the location to insert (helper method ```insertNode``` does).
3. otherwise assign the created node as tree node.

```javascript
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
```

# Remove Node #
To remove node, we need to get node data as an input as below

### Signature
```javascript
const bst = new BinarySearchTree();
bst.remove(5);
```

### Logic
1. remove method calls the ```removeNode``` method and assigns its result to root
2. removeNode method search for the node with the given data and perform following steps when it finds the node that matches with the given data

    1. **node found is a leaf node** then node can be deleted and return null
    2. **node found has only left node** then replace the current node with its left node and return the left node. viseversa - **if node found has only right node**
    3. **node found has both child node** then find the node with minimum value from its right and assign its data to the current node and pass the min node which found to the ```removeNode``` method

```javascript
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
```

# Get Root Node #
To get the root node just return the root variable from the function

```javascript
// returns root of the tree
const getRootNode = () => root;
```

# Search #
To search for a node with the input data

### Signature
```javascript
const bst = new BinarySearchTree();
bst.search(5);
```

### Logic
1. Check if node is empty then return null
2. If node is not empty, then compare the input data with node data
3. If input data is less than node data, then traverse through left
4. else traverse through right
5. once node with input data found return the node.

```javascript
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
```



> Thanks for reading!!!
