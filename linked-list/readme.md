# Linked List DataStructure #

In this section, we will be learning linked list datastructure.

![Queue Figure](https://raw.githubusercontent.com/mohanramphp/understanding-datastructures-in-javascript/master/linked-list/images/linked-list.jpg)


> A linked list is a linear sequence of elements known as nodes.

Each node consists of two things they are
1. data
2. pointer

**_Data_** holds the data value of the node.  
**_Pointer_** holds the reference to the memory location of next/previous node.

Pointer concept is extremely important in many programming languages like C/C++
> Pointers represent the address of a location in memory — in the other words, pointer is a variable that through it you can modify/read another variable.

In Linked List structure, Pointers are used as connections to hold pieces of the structure together. And therefore:

    Linked List is the structure where all elements are arranged in linear order, which is determined by pointer stored in each element.

There are two types of linked list. They are,
1. Singly Linked List    
    * This is the simplest linked structure. Each of the element will keep a pointer to the next element — aka successor 
    * Here the list saves the pointer to the head element. 
2. Doubly Linked List  
    * Similar to singly, but in addition to a pointer to next element, each element also keeps a pointer to the previous element — aka predecessor — in the list
    * The list will saves pointers to both head and tail.

