// // 타입가드

// // - 실패
// const isRejected = (input: PromiseSettledResult<unknown>): input is PromiseRejectedResult => {
//   return input.status === 'rejected';
// };

// // - 성공
// const isFulfilled = <T>(input: PromiseSettledResult<T>): input is PromiseFulfilledResult<T> => {
//   return input.status === 'fulfilled';
// };

// // Promise -> Pending -> Settled(fulfilled, Rejected)
// // promises.then().catch() <- 둘다 settled 임

// const promises = await Promise.allSettled([Promise.resolve('a'), Promise.resolve('b')]);

// // 에러를 성공 실패 여부 상관없이 완료되었다고 넓게(PromiseSettledResult) 추론함.
// // 이때 실패한 것을 모으고 싶다면..
// // const errors = promises.filter((promise) => promise.status === 'rejected'); // 실패한 것을 모아두는 코드
// // 이렇게 했는데도 rejected가 아니고 settled로 넓게 추론하고 있음
// // 이때 커스텀 타입가드를 통해 추론한다.! PromiseRejectedResult가 되었다.
// // 정확한 타입을 추론할 수 있다.
// const errors = promises.filter(isRejected);

// export { };

// readonly
// interface A {
//   readonly a: string;
//   b: string;
// }

// const aaaa: A = { a: 'hello', b: 'word' };
// aaaa.a = '1234;'

// 인덱스트 시그니처
type A = {[key: string]: number}; // 어떤 key든 간에 문자열이고 그 값들은 number
const aaaa: A = { a: 3, b: 5, c: 5, d: 123};

// 맵드 타입드
type B = 'Human' | 'Mammal' | 'Animal'; // - interface는 | (또는)이 안된다. -> 인터페이스에서는 &이 안된다.
type AA = {[key in B]: number}; // key가 B의 3개 문자열 중에 하나
const aaaaa: AA = { Human: 123, Mammal: 5, Animal: 7};
