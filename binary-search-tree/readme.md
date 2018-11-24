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
* traversal - depth first traversal (inorder,preorder, postorder)
* traversalMode - inorder,preorder, postorder
* getRootNode
* search
* breadthFirstTraversal

## Insert Node
In binary search tree we can insert the node with the following guidelines

```javascript
    const bst = new BinarySearchTree();
    // signature of the insert method is
    bst.insert(15);
```

1. create a tree node object with the input data.
2. check if root node exists on the tree, if yes search through the root node to find the location to insert.
3. otherwise assign the created node as tree node.

> Thanks for reading!!!
