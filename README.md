# Nested Set for Node.js written in TypeScript

[![Build Status](https://travis-ci.org/micksatana/node-nested-set.svg?branch=master)](https://travis-ci.org/micksatana/node-nested-set)
[![codecov](https://codecov.io/gh/micksatana/node-nested-set/branch/master/graph/badge.svg)](https://codecov.io/gh/micksatana/node-nested-set)
[![Dependency Status](https://david-dm.org/micksatana/node-nested-set.svg)](https://david-dm.org/micksatana/node-nested-set)

## Installation
```
npm install ts-node-nested-set
```

## Features
 * NestedSetNode instance has parent, children properties for ease of accessing the info
 * `append()` a node into existing node
 * `prepend()` a node into existing node
 * `flat()` into an array containing `{ left, right, depth, title }` information 
   for ease of updating to database later
 * `prevSibling()` retrieve the previous sibling or `null`
 * `nextSibling()` retrieve the next sibling or `null`
 * `isLeaf()` checks whether the node is the last node in the branch
 * `isRoot()` checks whether the node is the root node
 * `getSize()` get current node size. 2 if there is no children
 * `children` contains all children nodes. Empty array if the node has no child
 * `parent` refers to the parent node. `null` if the node is Root 

### Examples

```
import {NestedSetNode} from '../../lib/nested-set-node';

let root = new NestedSetNode(),
  nodeA = new NestedSetNode('Node A'),
  nodeB = new NestedSetNode('Node B', 0, 1, 1, root),
  nodeC = new NestedSetNode('Node C');

root.prepend(nodeA);
root.append(nodeC);
```
