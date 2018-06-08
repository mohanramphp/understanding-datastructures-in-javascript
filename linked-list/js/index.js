; (function () {

    const Node = function (value) {
        this.value = value;
        this.next = undefined;

        //On doubly linked list Node
        this.prev = undefined;
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
    console.log('SinglyLinkedList');
    console.log('--------------------------------------------');
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
    console.log('--------------------------------------------');

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
         * running time will be O(1) - since we have two way poniter connection.
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
    console.log('DoublyLinkedList');
    console.log('--------------------------------------------');
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
    console.log('--------------------------------------------');

})();