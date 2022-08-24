// 타입가드

// - 실패
const isRejected = (input: PromiseSettledResult<unknown>): input is PromiseRejectedResult => {
  return input.status === 'rejected';
};

// - 성공
const isFulfilled = <T>(input: PromiseSettledResult<T>): input is PromiseFulfilledResult<T> => {
  return input.status === 'fulfilled';
};

// Promise -> Pending -> Settled(fulfilled, Rejected) 
// promises.then().catch() <- 둘다 settled 임

const promises = await Promise.allSettled([Promise.resolve('a'), Promise.resolve('b')]);

// 에러를 성공 실패 여부 상관없이 완료되었다고 넓게(PromiseSettledResult) 추론함.
// 이때 실패한 것을 모으고 싶다면..
// const errors = promises.filter((promise) => promise.status === 'rejected'); // 실패한 것을 모아두는 코드
// 이렇게 했는데도 rejected가 아니고 settled로 넓게 추론하고 있음
// 이때 커스텀 타입가드를 통해 추론한다.! PromiseRejectedResult가 되었다.
// 정확한 타입을 추론할 수 있다.
const errors = promises.filter(isRejected);

export { };