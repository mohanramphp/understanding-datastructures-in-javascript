# Queue DataStructure #

> In datastructure language, queue is

![Queue Figure](https://raw.githubusercontent.com/mohanramphp/understanding-datastructures-in-javascript/master/queue/images/queue.jpg)

> a dynamic set, in which  
>    
> 1. Element/data is inserted to the end of the Queue
> 2. Element/data is deleted or removed from the beginning of the queue.

Basically delete or removal happens based on **First In First Out**

Beginning of the Queue is called as ```head``` and End of Queue is a ```tail```

Basically two operations are supported by queue by default, they are 
* Enqueue
* Dequeue

The simplest implementation of the Queue is 
```javascript
; (function () {
    /**
     * Simplest Implementation of Queue
     */
    let Queue = function () {
        const list = [],
            enQueue = data => list.push(data),
            deQueue = () => list.shift(),
            viewQueue = () => '(tail) ' + [...list].reverse().join(' -> ') + ' (head)';
        return Object.freeze({
            enQueue,
            deQueue,
            viewQueue
        });
    }
    const q = new Queue();
    console.log('enQueue operations');
    q.enQueue(1); // 1 enters in queue
    q.enQueue(2); // 2 enters in queue
    q.enQueue(3); // 3 enters in queue

    console.log('state of queue is');
    console.log(q.viewQueue()); // (tail) 3 -> 2 -> 1 (head)

    console.log('deQueue operations');
    console.log(q.deQueue()); // 1
    console.log(q.deQueue()); // 2
    console.log(q.deQueue()); // 3
})();
```
Above code is self explainatory, we basically used an array to acheive the implementation of a Queue.

Major drawbacks of above code are
* ```shift()``` function takes ```O(n)``` computational time where n is the size of the queue.
* Most of the operators in Array has ```O(n)``` time to compute. 

> Ideally, to improve efficiency we need ```O(1)``` for both EnQueue and DeQueue operations.

Best way to acheive the ideal scenerio is to use **```Objects```**

Lets implement with Object.

1. Basic structure of a queue
```javascript
let Queue = function () {
        const storage = Object.create(null);  // key, value pairs
        let head = 0, // to keep track of head
            tail = 0; // to keep track of tail
    }
```

2. Enqueue Operation
```javascript
const enQueue = (data) => {
            storage[tail] = data;
            tail++; // increasing tail pointer for the next element
        }
```

3. Dequeue Operation
```javascript
const deQueue = () => {
    if (size() <= 0) { // if queue is empty
        return undefined;
    }

    const item = storage[head];
    delete storage[head];
    head++; // increasing the head pointer to next element

    //Reset the counter
    if (head === tail) {
        head = 0;
        tail = 0;
    }

    return item;
}
```

Full implementation is here

```javascript
let Queue = function () {
        const storage = Object.create(null);  // key, value pairs
        let head = 0, // to keep track of head
            tail = 0; // to keep track of tail

        const enQueue = (data) => {
            storage[tail] = data;
            tail++; // increasing tail pointer for the next element
        },
            size = () => tail - head,
            deQueue = () => {
                if (size() <= 0) { // if queue is empty
                    return undefined;
                }

                const item = storage[head];
                delete storage[head];
                head++; // increasing the head pointer to next element

                //Reset the counter
                if (head === tail) {
                    head = 0;
                    tail = 0;
                }

                return item;
            },
            peek = () => storage[tail - 1],
            viewQueue = () => {
                var result = [];
                for (var key in storage) {
                    result.push(storage[key]);
                }
                return '(tail) ' + [...result].reverse().join(' -> ') + ' (head)';
            };
        return Object.freeze({
            enQueue,
            deQueue,
            size,
            peek,
            viewQueue
        });
    }

    let q = new Queue();
    console.log('enQueue operations');
    q.enQueue(1); // 1 enters in queue
    q.enQueue(2); // 2 enters in queue
    q.enQueue(3); // 3 enters in queue
    console.log('size = ' + q.size()); // 3
    console.log('peek value = ' + q.peek()); // 3
    console.log('state of queue is');
    console.log(q.viewQueue()); // (tail) 3 -> 2 -> 1 (head)
    console.log('deQueue operations');
    console.log(q.deQueue()); // 1
    console.log(q.deQueue()); // 2
```

> Thanks for reading!!!
