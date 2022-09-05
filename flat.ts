// Flat은 어떻게 배열의 차원을 알았을까?
// (number | number[])[]
const FA = [1, 2, 3, [1, 2], [[1], [2]]].flat(); // [1, 2, 3, 1, 2, [1], [2]];
const FA2 = [1, 2, 3, [1, 2], [[1], [2]]].flat(2); // flat에 숫자 매개변수를 넣을 경우, 2차원을 낮출 수 있다. number[]
const FB = [1, 2, 3, [1, 2]].flat(); // number[]

interface FArray {
  flat<A, D extends number = 1>(
    this: A,
    depth?: D
    // typescript 에서는 숫자를 낮출때 마이너스(-)로 depth를 관리할 수 없었는데, 
    // FlatArray에 숫자를 미리 배열로 가지고 있고 index를 통해서 depth를 관리한다. 
    // 아래에서 Depth가 0이면 -1이고, 1이면 0이고.. 이러하게 돌아감 (depth가 25고 하면 표현이 안됨 (최대 depth가 22개이기때문에)) 
    // 언어적한계로 -1를 못하지만 아래와 같이 구현.. (재귀에서 1씩 빠지는 구조로 만들어 졌기에)
    // FlatArray<InnerArr, [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20][Depth]
  ): FlatArray<A, D>[];
} 


const FA3 = [1, 2, 3, [1, 2], [[1], [2]]].flat(2);
// 2가 최초 depth가 됨
// this가 A이고, this가 [1, 2, 3, [1, 2], [[1], [2]]]
// depth가 D이고, D가 2
// 따라서 FlatArray<A, D> === FlatArray<number[] | number[][] | number[][][], 2>
// depth가 -1이 아니므로 recur되서 재귀 FlatArray<number | number[] | number[][], 1> 가 되어 재귀
// depth가 -1이 아니므로 recur되서 재귀 FlatArray<number | number[], 0>이 되어 재귀
// depth가 -1이 아니므로 recur되서 재귀 FlatArray<number, -1>이 되어서 done
// number이지만 number[]가 되는 이유? FlatArray<A, D>[]이기 때문에 number[]가 되는것 (타입은 동일하게 중첩되면 하나로 됨 number | number => number)
// --------
// "recur": Arr extends ReadonlyArray<infer InnerArr>
// ? FlatArray<InnerArr, [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20][Depth]>
// : Arr
