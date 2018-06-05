(function () {
    /**
     * Simplest Implementation of Stack
     */
    /*  let Stack = function () {
         const list = [],
             push = data => list.push(data),
             pop = () => list.pop(),
             size = () => list.length,
             viewStack = () => '(bottom) ' + list.join(' -> ') + ' (top)';
         return Object.freeze({
             push,
             pop,
             size,
             viewStack
         });
     }
     const s = new Stack();
     console.log('push operations');
     s.push(1); // 1 enters in stack
     s.push(2); // 2 enters in stack
     s.push(3); // 3 enters in stack
 
     console.log('state of stack is');
     console.log(s.viewStack()); // (bottom) 1 -> 2 -> 3 (top)
 
     console.log('pop operations');
     console.log(s.pop()); // 3
     console.log(s.pop()); // 2
     console.log(s.pop()); // 1 */

    let Stack = function () {
        const storage = Object.create(null);  // key, value pairs
        let stackSize = 0; // to keep track of top 


        const push = (data) => {
            storage[stackSize] = data;
            stackSize++; // increasing the stack size
        },
            size = () => stackSize,
            isEmpty = () => stackSize === 0,
            pop = () => {
                if (isEmpty()) { // if stack is empty
                    return undefined;
                }
                stackSize--;
                const item = storage[stackSize];
                delete storage[stackSize];
                return item;
            },
            peek = () => (!isEmpty()) ? storage[stackSize - 1] : undefined,
            stackEmpty = () => {
                while (!isEmpty()) {
                    pop();
                }
            },
            viewStack = () => {
                var result = [];
                for (var key in storage) {
                    result.push(storage[key]);
                }
                return '(bottom) ' + result.join(' -> ') + ' (top)';
            };
        return Object.freeze({
            push,
            pop,
            size,
            peek,
            viewStack,
            stackEmpty
        });
    }

    let s = new Stack();
    console.log('push operations');
    s.push(1); // 1 enters in stack
    s.push(2); // 2 enters in stack
    s.push(3); // 3 enters in stack
    console.log('size = ' + s.size()); // 3
    console.log('peek value = ' + s.peek()); // 3
    console.log('state of stack is');
    console.log(s.viewStack()); // (bottom) 1 -> 2 -> 3 (top)
    console.log('pop operations');
    console.log(s.pop()); // 3
    console.log(s.pop()); // 2 
    console.log('state of stack is');
    console.log(s.viewStack()); // (bottom) 1 (top)
    s.stackEmpty();
    console.log('stack size after running stackEmpty is ' + s.size());

})();