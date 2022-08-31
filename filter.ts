interface Arr3<T> {
  // filter(callback:(v: T) => v is T): T[]; // 1 번 예제
  filter<S extends T>(callback:(v: T) => v is S): S[]; // S가 T의 부분 집합 (number | string)임을 extends를 통해 적용
}

const filterA: Arr3<number> = [1, 2, 3];
// const filterAA = filterA.filter((v): v is number => v % 2 === 0); // 1번 예제: 타입 가드
const filterAA = filterA.filter((v): v is number => v % 2 === 0);

const filterB: Arr3<number | string> = [1, '2', 3, '4'];
// const filterBA = filterA.filter((v): v is string => typeof v === 'string'); // string[] // 1번 예제: 타입 가드
const filterBA = filterB.filter((v): v is string => typeof v === 'string'); // string[]

// 다시학습
interface Arr4<T> {
  filter<S extends T>(callback: (v: T) => v is S): S[];
}

const arr4A: Arr4<number> = [1, 2, 3, 4, 5];
const arr4AA = arr4A.filter((v): v is number => v % 2 === 0);

const arr4B: Arr4<string | number> = ['1', 2, '3', 4, '5'];
const arr4BA = arr4B.filter((v): v is string => typeof v === 'string'); // 형식 조건자 === 커스텀 타입 가드 === v is string
const arr4BB = arr4B.filter((v): v is number => typeof v === 'number');

// 가독성 고려하면 콜백을 밖으로 빼도 된다. => 가독성은 둘다 안 좋아서 별로 상관 없음
const arr4BCPredicate = (v: string | number): v is number => typeof v === 'number';
const arr4BC = arr4B.filter(arr4BCPredicate);

