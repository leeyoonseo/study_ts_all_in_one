interface Arr2<T> { // <T, S>도 할 수 있으나 사용하는 순간까지 알 수 없는 경우들이 많다. 
  // 따라서 map<S> 옆에 새로운 제네릭으로 등록 === 사용할때
  map<S>(callback: (v: T, i: number) => S): S[]; // => S의 자리가 문자가 되므로 map<S>도 문자가 되고 S[]도 string[]이 될 수 있다.
}

const mapA: Arr2<number> = [1, 2, 3];
const mapB = mapA.map(v => v + 1);
const mapBA = mapA.map((v, i) => v + 1);
const mapC = mapA.map(v => v.toString()); // S[] === string[]
const mapD = mapA.map(v => v % 2 === 0); // S[] === boolean[]

// 여러 타입으로 테스트해봐야한다.
const mapE: Arr2<string> = ['1', '2', '3']; // 이렇게도 테스트해보고 잘 되는가 확인
const mapF = mapE.map(v => +v);