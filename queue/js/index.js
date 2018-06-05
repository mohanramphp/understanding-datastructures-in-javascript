; (function () {
    /**
     * Simplest Implementation of Queue
     */
    /* let Queue = function () {
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
    console.log(q.deQueue()); // 3 */

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
})();