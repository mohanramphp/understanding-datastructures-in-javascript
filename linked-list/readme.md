# Linked List DataStructure #

In this section, we will be learning linked list datastructure.

![Linked List Figure](https://raw.githubusercontent.com/mohanramphp/understanding-datastructures-in-javascript/master/linked-list/images/linked-list-1.jpg)


> A linked list is a linear sequence of elements known as nodes.

Each node consists of two things they are
1. data
2. pointer

**_Data_** holds the data value of the node.  
**_Pointer_** holds the reference to the memory location of next/previous node.

Pointer concept is extremely important in many programming languages like C/C++
> Pointers represent the address of a location in memory — in the other words, pointer is a variable that through it you can modify/read another variable.

In Linked List structure, Pointers are used as connections to hold pieces of the structure together. And therefore:

> Linked List is the structure where all elements are arranged in linear order, which is determined by pointer stored in each element.

> * On comparing with Array data structure, Linked List is a flexible presentation for dynamic sets. 
> * Elements in Linked List do not need to be allocate in the same block of memory (as in Array), but can be connected/chained together using pointer to form a list.

There are two types of linked list. They are,
1. Singly Linked List    
    * This is the simplest linked structure. Each of the element will keep a pointer to the next element — aka successor 
    * Here the list saves the pointer to the head element. 
2. Doubly Linked List  
    * Similar to singly, but in addition to a pointer to next element, each element also keeps a pointer to the previous element — aka predecessor — in the list
    * The list will saves pointers to both head and tail.

![Types of Linked List Figure](https://raw.githubusercontent.com/mohanramphp/understanding-datastructures-in-javascript/master/linked-list/images/linked-list-2.jpg)

## Operations supports by linked list are ##
---
1. **Search** — search for an element based on its value/data stored
2. **Insert** — Insert new element to the list.
3. **Delete** — Remove an element based on its value from the list

## Singly Linked List Implemenation ##

1. Lets potray our node and below is how it looks like
```javascript
const Node = function (value) {
    this.value = value;
    this.next = undefined;
}
```

2. Lets define our SinglyLinkedList with pointer to a head element (i.e. head) and list size (i.e. length)
```javascript
const SinglyLinkedList = function () {
        let head = undefined,
        size = 0;
    }
```    
3. Now, lets define three basic operations of singly linked list  

And the full implemenation is here

```javascript
const Node = function (value) {
    this.value = value;
    this.next = undefined;
}

const SinglyLinkedList = function () {
    let head = undefined,
        size = 0;

    /**
     * for the sake of convenience and to maintain constant running time O(1)
     * with insertNodeAtFirst method, we will insert new node to the beginning of the list.
     */
    const insertNodeAtFirst = (item) => {
        // to make sure item to insert is valid or not.
        if (!item) return;

        // create new Node to wrap around the item data.
        const node = new Node(item);

        /**
         * check if it is not the first element in list,
         * if so, update the node next pointer to point to old head
         * */
        if (head) {
            node.next = head;
        }
        // update the head of the list and length of the list.
        head = node;
        size++;
    }

    /**
     * insertNodeAtLast method - inserts the node to the end of the list.
     * running time will be O(n) - n is the size of the lins.
     */
    const insertNodeAtLast = (item) => {
        // create new Node to wrap around the item data.
        const node = new Node(item);

        if (head) {
            let iterator = head;
            while (iterator.next !== undefined) {
                iterator = iterator.next;
            }
            iterator.next = node;
        } else { // if there is no available node in the list
            head = node;
        }
        size++
    }

    const deleteNode = (value) => {
        if (head) {
            // to check head value
            if (head.value === value) {
                head = head.next;
                size--;
                return;
            }
            let current = head;
            // iterate through list to find the matching node
            while (current) {
                // check if the next node is the matched one
                if (current.next) {
                    var next = current.next;
                    if (next.value === value) {
                        // remove from list and update the next pointer if found
                        current.next = next.next;
                        size--; // update the size
                        break; // no need to continue looping
                    }
                }
                current = current.next;
            }
        } else {
            return;
        }
    }

    const searchNode = (value) => {
        let current = head;
        var found = undefined;
        while (current) {
            if (current.value === value) {
                found = current;
                break;
            }
            current = current.next;
        }
        return found;
    }

    const listSize = () => size;

    const print = () => {
        const result = [];
        let current = head;
        while (current) {
            result.push(current.value);
            current = current.next
        }
        return '(head) ' + result.join(' -> ') + ' ( end of list )';
    };

    return Object.freeze({
        insertNodeAtFirst,
        insertNodeAtLast,
        deleteNode,
        searchNode,
        listSize,
        print
    });
}


let l = new SinglyLinkedList();
console.log('insertNodeAtFirst operations');
l.insertNodeAtFirst('one'); // one enters in list
l.insertNodeAtFirst('two'); // two enters in list
l.insertNodeAtFirst('three'); // three enters in list
console.log('insertNodeAtLast operations');
l.insertNodeAtLast('four'); // four enters in list
l.insertNodeAtLast('five'); // five enters in list

console.log('size of the list is');
console.log(l.listSize()); // 5

console.log('printing the state of list');
console.log(l.print()); // (head) three -> two -> one -> four -> five ( end of list )

console.log('Search node with value \'one\'');
console.log(l.searchNode('one')); // Node {value: "one", next: Node}

console.log('delete node with value \'one\'');
l.deleteNode('one');

console.log('printing the state of list');
console.log(l.print()); // (head) three -> two -> four -> five ( end of list )

console.log('size of the list is');
console.log(l.listSize()); // 4
```

Complexity of the process are below
* **insertNodeAtFirst** - O(1).
* **insertNodeAtLast** - O(n) - ```n``` is the size of the list.
* **deleteNode** - O(n) - ```n``` is the length of iteration till  match value is found.
* **searchNode** - O(n) - ```n``` is the length of iteration till  match value is found.
* **print** - O(n) - ```n``` is the size of the list .


## Doubly Linked List Implemenation ##
---

1. Lets potray our node and below is how it looks like
```javascript
const Node = function (value) {
    this.value = value;
    this.prev = undefined;
    this.next = undefined;
}
```

2. Lets define our DoublyLinkedList with pointer to a head and tail element (i.e. head, tail) and list size (i.e. length)
```javascript
const DoublyLinkedList = function () {
        let head = undefined,
        tail = undefined,
        size = 0;
    }
```    
3. Now, lets define three basic operations of singly linked list  

And the full implemenation is here

```javascript
const DoublyLinkedList = function () {
    let head = undefined,
        tail = undefined,
        size = 0;

    /**
     * for the sake of convenience and to maintain constant running time O(1)
     * with insertNodeAtFirst method, we will insert new node to the beginning of the list.
     */
    const insertNodeAtFirst = (item) => {
        // to make sure item to insert is valid or not.
        if (!item) return;

        // create new Node to wrap around the item data.
        const node = new Node(item);

        /**
         * check if it is not the first element in list,
         * if so, update the node next pointer to point to old head
         * */
        if (head) {
            node.next = head;
            head.prev = node; // update the previous pointer of old head
        }
        // update the head of the list and length of the list.
        head = node;

        if (!tail) {
            tail = node;  // update the tail
        }
        size++;
    }

    /**
     * insertNodeAtLast method - inserts the node to the end of the list.
     * running time will be O(1) - since we have two way pointer connection.
     */
    const insertNodeAtLast = (item) => {
        // create new Node to wrap around the item data.
        const node = new Node(item);

        if (tail) {
            tail.next = node;
            node.prev = tail;
        }

        tail = node;

        if (!head) {
            head = node;
        }

        size++;
    }

    const deleteNode = (value) => {

        let current = head;
        // iterate through list to find the matching node
        while (current) {
            if (current.value === value) {
                let prev = current.prev,
                    next = current.next;

                //Update the pointers
                if (prev) {
                    prev.next = next;
                }
                else {
                    head = next; // if matched node is the head
                }

                if (next) {
                    next.prev = prev;
                }
                else {
                    tail = prev;// if matched node is the tail
                }
                size--;
                break;
            }

            current = current.next;
        }

    }

    const searchNode = (value) => {
        let current = head;
        var found = undefined;
        while (current) {
            if (current.value === value) {
                found = current;
                break;
            }
            current = current.next;
        }
        return found;
    }

    const listSize = () => size;

    const print = () => {
        const result = [];
        let current = head;
        while (current) {
            result.push(current.value);
            current = current.next
        }
        return '(head) ' + result.join(' -> ') + ' ( tail )';
    };

    return Object.freeze({
        insertNodeAtFirst,
        insertNodeAtLast,
        deleteNode,
        searchNode,
        listSize,
        print
    });
}

let d = new DoublyLinkedList();
console.log('insertNodeAtFirst operations');
d.insertNodeAtFirst('one'); // one enters in list
d.insertNodeAtFirst('two'); // two enters in list
d.insertNodeAtFirst('three'); // three enters in list
console.log('insertNodeAtLast operations');
d.insertNodeAtLast('four'); // four enters in list
d.insertNodeAtLast('five'); // five enters in list

console.log('size of the list is');
console.log(d.listSize()); // 5

console.log('printing the state of list');
console.log(d.print()); // (head) three -> two -> one -> four -> five ( tail )

console.log('Search node with value \'one\'');
console.log(d.searchNode('one')); // Node {value: "one", next: Node, prev: Node}

console.log('delete node with value \'one\'');
d.deleteNode('one');

console.log('printing the state of list');
console.log(d.print()); // (head) three -> two -> four -> five ( tail )

console.log('size of the list is');
console.log(d.listSize()); // 4
```

Complexity of the process are below
* **insertNodeAtFirst** - O(1).
* **insertNodeAtLast** - O(1) since we have two way pointer connections.
* **deleteNode** - O(n) - ```n``` is the length of iteration till match value is found.
* **searchNode** - O(n) - ```n``` is the length of iteration till match value is found
* **print** - O(n) - ```n``` is the size of the list .

## When to use linked list ##
---
1. When we need to do **lot of insert and delete operations** in the list, go for linked list since insertions and deletions are simpler than for array.
2. When node searching is not that important.
3. For large data, **moving pointers is easier and faster** than moving items themselves.
4. **Overflow on list will never** occur because it doesn’t require a contiguous block of memory, unless the memory is actually full (not so relevant in JavaSript).
5. We need to **split or combine** different list together, because splitting and joining lists is very efficient.

## Disadvantages are ##
---

1. Linked List required **extra space** for storing pointers.
2. **Randomly access an item in the list is difficult** — there is no real index to access item like in array.
3. Arrays allow better memory locality and cache performance.

> **_Do not try to sort (merge sort or any thing) a Linked List._**

> Thanks for reading!!!

