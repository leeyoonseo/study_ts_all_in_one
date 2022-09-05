// p1 = 바로 결과가 나오는 함수
const p1 = Promise.resolve(1).then((a) => a + 1).then((a) => a + 1).then((a) => a.toString());
// Promise<number>, Promise<number>, Promise<string>

// Promise<T>인데, T는 reslove의 타입을 확인하면 number라는 것을 확인 할 수 있다. (value: T)이기에
// reslove타입 reslove<T>(value: T | PromiseLink<T>): Promise<T>;
// then의 return 값은 Promse<TResult1 | TResult2>; * 이 부분은 잘 이해안감...ㅠ

const p2 = Promise.resolve(2); // Promise<number>

// new Promise하면 resolve: (value: T | PromiseLink<T>) => resolve할때 value를 안 넣어줬기 때문에 Promise<unknown>
// new <T>(executor: (resolve: (value: T | PromiseLink<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;
const p3 = new Promise((res, rej) => { // Promise<unknown>
  // setTimeout({
  //  res(); // resolve시 value를 안 넣음
  // }, 1000);
  setTimeout(res, 1000);
});

// 프로미스는 Promise<결과값> 타입으로 표시한다.
Promise.all([p1, p2, p3]).then((result) => { // result: [string, number, unknown] 어떻게 타입을 추론할까?
  console.log(result);
});

// all
// 1. T = [p1, p2, p3] = { '0': p1, '1': p2, '2': p3, 'length': 3 }
// 2. keyof T = '0' | '1' | '2' | 'length'
// 3. -readonly => [p1, p2, p3] 는 읽기 전용이지만, result는 수정가능해야하므로 -readonly
// 4. { -readonly [P in keyof T]: Awaited<T[P]> } => 전체적으로 보면 배열임 (T를 mapped types로 만들면 배열이기에..)
// 5. Awaited<T[P]> => T[P]은 배열의 값들을 의미한다.
// interface Promise {
//   all<T extends readonly unknown[] | []>(values: T): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }>;
// }

// T는 p1, p2, p3 같은 promise들
type PAwaited<T> =
  T extends null | undefined ? T : // p1, p2, p3가 null | undefined일 경우 그 상태 그대로 넘겨줌
  // 객체면서 then이라는 메서드가 있느냐
  // infer를 통해 onfulfilled 타입을 추론 함 (promise의 then type 참고)
  // * 근데 promise then으로 타입을 좁히면 되는데 then 함수 자체를 선언한 이유는 무엇인가? 
  // -> duck typing: 사람이 오리처럼 행동하면 오리로 봐도 무방하다는 뜻 
  // -> (때문에 promise 객체가 아니라 then 함수를 넣어도 오류나지 않음 === 이걸 thenable 이라함)
  // -> Awaited<{ then(onfulfilled: (v: number) => number): any }>; -> 모양이 같으면 똑같은 것으로 처리가 된다.
  T extends object & { then(onfulfilled: infer F): any } ?
  F extends ((value: infer V, ...args: any) => any) ? // F는 함수이다. 이게 맞으면 Awaited<V>로 재귀 한다.

  // T가 Promise<number>, value infer의 V는 number임, 그러면 Awaited<V>는 Awaited<numbr>가 됨 
  // 그리고 Awaited<numbr>를 통해 재귀를 하게되면 T가 numer가 되고 두번째 줄에서 then이 없기 때문에 그대로 number가 리턴된다. === 타입이 number로 추론되는 이유
  Awaited<V> : 
  never :
  T;