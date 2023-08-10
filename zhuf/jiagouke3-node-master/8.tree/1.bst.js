// binary search tree
class Node {
    constructor(element, parent) {
        this.element = element;
        this.left = null; // 左树
        this.right = null; // 右树
        this.parent = parent; // 父节点
    }
}
class BST {
    constructor(compare) {
        this.root = null;
        let tempCompare = this.compare
        this.compare = compare || tempCompare
    }
    compare(n1, n2) {
        return n1 < n2
    }
    add(element) {
        if (this.root == null) {
            this.root = new Node(element);
            return
        } else {
            let current = this.root;
            let parent;
            let compare;
            while (current) {
                parent = current;
                compare = this.compare(element, current.element)
                if (compare) { // 左边 
                    current = current.left
                    // current.left = new Node(element,current)
                } else { // 右边
                    current = current.right
                    // current.right = new Node(element,current)
                }
            }
            let node = new Node(element, parent);
            if (compare) {
                parent.left = node
            } else {
                parent.right = node
            }
        }
    }
    preorderTranversal(callback){
        function traversal(node){
            if(node == null) return
            callback(node);
            let r = node.right;
            node.right = node.left;
            node.left = r;
            traversal(node.left)
            traversal(node.right)
        }
        traversal(this.root);
    }
    inorderTraversal(callback){
        function traversal(node){
            if(node == null) return
            traversal(node.left)
            callback(node);
            traversal(node.right)
        }
        traversal(this.root);
    }
    postorderTraversal(callback){
        function traversal(node){
            if(node == null) return
            traversal(node.left)
            traversal(node.right)
            callback(node);
        }
        traversal(this.root);
    }
    levelOrderTraversal(callback){
        let stack = [this.root];
        let i = 0
        let current;
        while (current = stack[i++]) {
            callback(current);
            let r = current.right;
            current.right = current.left;
            current.left = r;
            if(current.left)stack.push(current.left);
            if(current.right)stack.push(current.right);
        }
    }
}
let bst = new BST((a, b) => {
    return a.age - b.age < 0
}); // sort排序
//  这个二叉搜索树 只能存数字
bst.add({ age: 10 });
bst.add({ age: 12 });
bst.add({ age: 5 });
bst.add({ age: 6 });
// console.dir(bst, { depth: 100 }); 
// 树的遍历方式 ：  4种 先序遍历 中序遍历 后续遍历 层序遍历  数据的扁平化

// 1.在处理类似的dom节点的时候 我希望遇到节点 就处理节点 可以采用先序遍历
// 2.我希望处理二叉搜素树按照顺序处理 可以采用中序方式
// 3.dom树  我不能遍历到这个节点就处理 我期望的是先处理儿子 在处理自己  (如果用非递归方式 实现 先序 后续 中序)
// 4.层序就是按照层级顺序来遍历这棵树
bst.levelOrderTraversal((node)=>{ // 都可以遍历树中的每一个节点
    console.log(node.element)
});

// 如何实现反转二叉树