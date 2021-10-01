
/* tslint-disable */
const Tree = require('incrementalquintree/build/IncrementalQuinTree');

type IncrementalQuinTree = any;

type Leaf = number | bigint;

// IncrementalTree algo tests
const testTree = () => {

    const values: Leaf[]  = [0, 1, 2, 3, 4, 5, 6, 7];
    const hashFn = (leafs: Leaf[]) => {
        const x: any = leafs[0];
        const y: any =  leafs[1];
        return x - y - (BigInt(1) as any);
    };
    const tree: IncrementalQuinTree = new Tree.IncrementalQuinTree(3, BigInt(0), 2, hashFn);

    for(let i = 0; i < values.length; i++) {
        values[i] = BigInt(values[i]);
        tree.insert(values[i]);
    }

    console.log(tree.zeros)
    console.log(tree.filledSubtrees)
    console.log(tree.filledPaths)
    console.log(tree.root)

    const proof = tree.genMerklePath(3);

    console.log("proof", proof);
    const expectedPathElements = [[BigInt(2)], [BigInt(-2)], [BigInt(-1)]];
    const expectedIndices: BigInt[] = [BigInt(1), BigInt(1), BigInt(0)];
    const expectedRoot = BigInt(-1);
    const expectedLeaf = BigInt(3);

    for(let i = 0; i < proof.pathElements.length; i++) {
        for (let j = 0; j < proof.pathElements[i].length; j++) {
            const pathElOg = proof.pathElements[i][j];
            const pathElExpected = expectedPathElements[i][j];
            console.log(`path el original: ${pathElOg}, expected: ${pathElExpected}`)
        }
    }

    for(let i = 0; i < proof.indices.length; i++) {
        const ogId = proof.indices[i];
        const expectedId = expectedIndices[i];
        console.log(`index original: ${ogId}, expected: ${expectedId}`)
    }

    console.log(`leaf original: ${proof.leaf}, expected: ${expectedLeaf}`)


    console.log(`root original: ${proof.root}, expected: ${expectedRoot}`)

}

testTree();