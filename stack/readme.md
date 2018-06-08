# Stack DataStructure #

> In datastructure language, stack is

![Stack Figure](https://raw.githubusercontent.com/mohanramphp/understanding-datastructures-in-javascript/master/stack/images/stack.jpg)

> a dynamic set, in which  
>    
> 1. Element/data is inserted to top of the stack
> 2. Element/data is deleted or removed from the top.

Basically, delete or removal happens based on **Last In First Out**

Two operations are supported by stack by default, they are 
* ```Push``` - To add data to stack
* ```Pop``` - To remove data from the stack

**Two important concepts** need to know about stack before, we start coding is 
1. Stack overflows  
This represents the status of the stack when the size of a stack exceeds the maximum allowed number — stack bound — say n. Normally this number is defined before hand.
2. Stack underflows  
It is the status when an empty stack is popped. This is not a big issue we can have protection check before we try to pop() a stack.

The simplest implementation of the Stack is 
```javascript
/**
 * Simplest Implementation of Stack
 */
let Stack = function () {
    const list = [],
        push = data => list.push(data),
        pop = () => list.length > 0 ? list.pop() : undefined,
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
console.log(s.pop()); // 1
```
Above code is self explainatory, we basically used an array to acheive the implementation of a Stack.

Though the big O time complexity of above code takes ```O(1)``` for push and pop

One drawbacks from the above code is
* Array needs to keep its order, hence it takes up a block of space (consecutive memory allocation).

Moreover every thing in JavaScript is an Object. Lets implement with Object.

1. Basic structure of a stack
```javascript
let Stack = function () {
        const storage = Object.create(null);  // key, value pairs
        let stackSize = 0; // to keep track of top 
    }
```

2. push Operation
```javascript
const push = (data) => {
            storage[stackSize] = data;
            stackSize++; // increasing the stack size
        }
```

3. Pop Operation
```javascript
const pop = () => {
    if (isEmpty()) { // if stack is empty
        return undefined;
    }
    stackSize--;
    const item = storage[stackSize];
    delete storage[stackSize];
    return item;
}
```

Full implementation is [here](https://raw.githubusercontent.com/mohanramphp/understanding-datastructures-in-javascript/master/stack/js/index.js)

```javascript
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
```

> Thanks for reading!!!
