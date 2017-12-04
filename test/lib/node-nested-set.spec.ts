import * as chai from 'chai';
import {NestedSetNode} from '../../lib/nested-set-node';

const expect = chai.expect;

describe('NestedSetNode', () => {

  describe('constructor', () => {

    describe('when parameter not provided', () => {
      it('should create default as root node', () => {
        let node = new NestedSetNode('root');

        expect(node.parent).to.be.null;
        expect(node.left).to.equal(0);
        expect(node.right).to.equal(1);
        expect(node.depth).to.equal(0);
        expect(node.title).to.equal('root');
      });
    });

    describe('when left, right and depth are provided', () => {
      let node: NestedSetNode;

      before(() => {
        node = new NestedSetNode('node', 7, 8, 1);
      });

      it('should create node with left, right and depth', () => {
        expect(node.left).to.equal(7);
        expect(node.right).to.equal(8);
        expect(node.depth).to.equal(1);
      });
    });

  });

  describe('isLeaf', () => {

    describe('when is the root node', () => {
      it('should not be a leaf', () => {
        let node = new NestedSetNode();

        expect(node.isLeaf()).to.be.false;
      });
    });

    describe('when is a leaf node', () => {
      it('should be a leaf', () => {
        let leaf = new NestedSetNode('leaf', 1, 2, 1, new NestedSetNode('root', 0, 3, 0));

        expect(leaf.children.length).to.equal(0);
        expect(leaf.isLeaf()).to.be.true;
        expect(leaf.getSize(), 'has size equal to 2').to.equal(2);
      });
    });

  });

  describe('isRoot', () => {

    describe('when is the root node', () => {
      it('should be the root', () => {
        let node = new NestedSetNode();

        expect(node.isRoot()).to.be.true;
      });
    });

    describe('when is a leaf node', () => {
      it('should not be the root', () => {
        let root = new NestedSetNode(),
          leaf = new NestedSetNode('leaf', 1, 2, 1, root);

        expect(leaf.isRoot()).to.be.false;
      });
    });

  });

  describe('prevSibling', () => {

    describe('when has previous sibling', () => {
      it('should return previous sibling', () => {
        let root = new NestedSetNode('root'),
          current = new NestedSetNode('current', 3, 4, 1),
          prev = new NestedSetNode('prev', 1, 2, 1);

        root.append(prev);
        root.append(current);

        expect(current.prevSibling()).to.equal(prev);
      });
    });

    describe('when does not have previous sibling', () => {
      it('should return null', () => {
        let root = new NestedSetNode(),
          current = new NestedSetNode('', 1, 2, 1);

        root.append(current);

        expect(current.prevSibling()).to.be.null;
      });
    });

    describe('when is the root node', () => {
      it('should return null', () => {
        let root = new NestedSetNode();

        expect(root.prevSibling()).to.be.null;
      });
    });

  });

  describe('nextSibling', () => {

    describe('when has next sibling', () => {
      it('should return next sibling', () => {
        let root = new NestedSetNode(),
          next = new NestedSetNode('', 3, 4, 1),
          current = new NestedSetNode('', 1, 2, 1);

        root.append(current);
        root.append(next);

        expect(current.nextSibling()).to.equal(next);
      });
    });

    describe('when does not have next sibling', () => {
      it('should return null', () => {
        let root = new NestedSetNode('root'),
          current = new NestedSetNode('current', 1, 2, 1);

        root.append(current);

        expect(current.nextSibling()).to.be.null;
      });
    });

    describe('when is the root node', () => {
      it('should return null', () => {
        let root = new NestedSetNode();

        expect(root.nextSibling()).to.be.null;
      });
    });

  });

  describe('countNextSiblings', () => {

    describe('when has next sibling(s)', () => {
      it('should return number of next sibling(s)', () => {
        let root = new NestedSetNode('root'),
          next1 = new NestedSetNode('next1', 3, 4, 1),
          next2 = new NestedSetNode('next2', 5, 6, 1),
          current = new NestedSetNode('current', 1, 2, 1);

        root.append(current);
        root.append(next1);
        root.append(next2);

        expect(current.countNextSiblings()).to.equal(2);
        expect(next1.countNextSiblings()).to.equal(1);
        expect(next2.countNextSiblings()).to.equal(0);
      });
    });

    describe('when is the root node', () => {
      it('should has no sibling', () => {
        let root = new NestedSetNode();

        expect(root.countNextSiblings()).to.equal(0);
      });
    });

  });

  describe('toNestedSetProperties', () => {
    it('should has only necessary properties', () => {
      let root = new NestedSetNode(),
        nestedSetProps = root.toNestedSetProperties();

      expect(nestedSetProps).to.deep.equal({depth: 0, left: 0, right: 1, title: ''});
      expect((nestedSetProps as NestedSetNode).parent, 'should not have parent property').to.be.undefined;
      expect((nestedSetProps as NestedSetNode).children, 'should not have children property').to.be.undefined;
    });
  });

  describe('flat', () => {
    it('should return an array of nested set nodes', () => {
      let root = new NestedSetNode('root'),
        child1 = new NestedSetNode('child1', 0, 1, 1, root),
        child2 = new NestedSetNode('child2', 0, 1, 1, root),
        child3 = new NestedSetNode('child3', 0, 1, 1, root),
        child4 = new NestedSetNode('child4', 0, 1, 1, child3),
        child5 = new NestedSetNode('child5', 0, 1, 1, child1),
        child6 = new NestedSetNode('child6', 0, 1, 1, child2),
        flatList = root.flat();

      expect(flatList.length, 'should contains all nodes').to.equal(7);
      expect(flatList[0]).to.deep.equal({ depth: root.depth, left: root.left, right: root.right, title: root.title });
      expect(flatList[1]).to.deep.equal({ depth: child1.depth, left: child1.left, right: child1.right, title: child1.title });
      expect(flatList[2]).to.deep.equal({ depth: child5.depth, left: child5.left, right: child5.right, title: child5.title });
      expect(flatList[3]).to.deep.equal({ depth: child2.depth, left: child2.left, right: child2.right, title: child2.title });
      expect(flatList[4]).to.deep.equal({ depth: child6.depth, left: child6.left, right: child6.right, title: child6.title });
      expect(flatList[5]).to.deep.equal({ depth: child3.depth, left: child3.left, right: child3.right, title: child3.title });
      expect(flatList[6]).to.deep.equal({ depth: child4.depth, left: child4.left, right: child4.right, title: child4.title });
    });
  });

  describe('append', () => {

    describe('when another child node exists', () => {
      let root: NestedSetNode,
        existingChild: NestedSetNode,
        child: NestedSetNode;

      before(() => {
        root = new NestedSetNode();
        existingChild = new NestedSetNode('existingChild');
        child = new NestedSetNode('child');

        root.append(existingChild);
        root.append(child);
      });

      it('should set the child node parent as itself', () => {
        expect(child.parent).to.equal(root);
      });

      it('should contain the child at correct position', () => {
        expect(root.children[1]).to.equal(child);
      });

      it('should have correct left, right, depth', () => {
        expect(root.left).to.equal(0);
        expect(existingChild.left).to.equal(1);
        expect(existingChild.right).to.equal(2);
        expect(child.left).to.equal(3);
        expect(child.right).to.equal(4);
        expect(root.right).to.equal(5);

        expect(root.depth).to.equal(0);
        expect(existingChild.depth).to.equal(1);
        expect(child.depth).to.equal(1);
      });

    });

  });

  describe('prepend', () => {

    describe('when another child node exists', () => {
      let root: NestedSetNode,
        existingChild: NestedSetNode,
        child: NestedSetNode;

      before(() => {
        root = new NestedSetNode('root');
        existingChild = new NestedSetNode('existingChild');
        child = new NestedSetNode('child');

        root.prepend(existingChild);
        root.prepend(child);
      });

      it('should set the child node parent as itself', () => {
        expect(child.parent).to.equal(root);
      });

      it('should contain the child at correct position', () => {
        expect(root.children[0]).to.equal(child);
      });

      it('should have correct left, right, depth', () => {
        expect(root.left).to.equal(0);
        expect(child.left).to.equal(1);
        expect(child.right).to.equal(2);
        expect(existingChild.left).to.equal(3);
        expect(existingChild.right).to.equal(4);
        expect(root.right).to.equal(5);

        expect(root.depth).to.equal(0);
        expect(existingChild.depth).to.equal(1);
        expect(child.depth).to.equal(1);
      });

    });

  });

  describe('rebuild', () => {
    let root: NestedSetNode,
      existingChild1: NestedSetNode,
      existingChild2: NestedSetNode,
      child: NestedSetNode;

    before(() => {
      root = new NestedSetNode('root');
      existingChild1 = new NestedSetNode('existingChild1', 1, 2, 1);
      existingChild2 = new NestedSetNode('existingChild2', 3, 4, 1);
      child = new NestedSetNode('child', 1, 2, 2);

      root.append(existingChild1);
      root.append(existingChild2);
      existingChild1.append(child);
    });

    it('should set the child node parent as itself', () => {
      expect(existingChild1.children[0].parent).to.equal(existingChild1);
    });

    it('should rebuild the tree correctly', () => {
      expect(root.left).to.equal(0);
      expect(existingChild1.left).to.equal(1);
      expect(child.left).to.equal(2);
      expect(child.right).to.equal(3);
      expect(existingChild1.right).to.equal(4);
      expect(existingChild2.left).to.equal(5);
      expect(existingChild2.right).to.equal(6);
      expect(root.right).to.equal(7);

      expect(root.depth).to.equal(0);
      expect(existingChild1.depth).to.equal(1);
      expect(existingChild2.depth).to.equal(1);
      expect(child.depth).to.equal(2);
    });

  });

  describe('removeChild', () => {

    describe('when remove existing children', () => {
      let root: NestedSetNode,
        existingChild1: NestedSetNode,
        existingChild2: NestedSetNode;

      before(() => {
        root = new NestedSetNode('root');
        existingChild1 = new NestedSetNode('existingChild1', 1, 2, 1);
        existingChild2 = new NestedSetNode('existingChild2', 3, 4, 1);

        root.append(existingChild1);
        root.append(existingChild2);
        root.removeChild(existingChild2);
        root.removeChild(existingChild1);
      });

      it('should remove the second child', () => {
        expect(root.children.indexOf(existingChild2)).to.equal(-1);
      });

      it('should remove the first child', () => {
        expect(root.children.indexOf(existingChild1)).to.equal(-1);
      });

      it('should rebuild the tree correctly', () => {
        expect(root.left).to.equal(0);
        expect(root.right).to.equal(1);
        expect(root.depth).to.equal(0);
      });

    });

  });

  describe('validate', () => {

    describe('when is leaf without parent', () => {
      it('should create node with left, right and depth', () => {
        let node = new NestedSetNode('node', 7, 8, 1);

        expect(() => node.validate()).to.throw('Required parent when depth is not zero.');
      });
    });

    describe('when its left property lower than parent', () => {
      it('should throw an error', () => {
        let parent = new NestedSetNode('node'),
          node = new NestedSetNode('node', 0, 0, 0, parent);

        node.left = -1;
        expect(() => node.validate()).to.throw('Node left property cannot be lower than or equals to its parent left property.');

        node.left = parent.left;
        expect(() => node.validate()).to.throw('Node left property cannot be lower than or equals to its parent left property.');
      });
    });

    describe('when its right property greater than parent', () => {
      it('should throw an error', () => {
        let parent = new NestedSetNode('node'),
          node = new NestedSetNode('node', 0, 0, 0, parent);

        node.right = 99;
        expect(() => node.validate()).to.throw('Node right property cannot be greater than or equals to its parent right property.');

        node.right = parent.right;
        expect(() => node.validate()).to.throw('Node right property cannot be greater than or equals to its parent right property.');
      });
    });

    describe('when its depth property not equals to parent depth plus one', () => {
      it('should throw an error', () => {
        let parent = new NestedSetNode('node'),
          node = new NestedSetNode('node', 0, 0, 0, parent);

        node.depth = parent.depth + 2;
        expect(() => node.validate()).to.throw('Node depth property must be exactly plus-one of its parent depth property.');
      });
    });

  });
});
