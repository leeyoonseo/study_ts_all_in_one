// forEach 타입 만들기
interface Arr<T> {
  forEach(callback: (item: T) => void): void;
  // 실제 forEach와는 다르나, 사용하는 코드 위주로 타입을 추가할 것
}

const a: Arr<number> = [1, 2, 3];

a.forEach((item) => {
  console.log(item);
});

a.forEach((item) => {
  console.log(item);
  return '3';
});

const b: Arr<string> = ['1', '2', '3'];

b.forEach((item) => {
  console.log(item);
});

b.forEach((item) => {
  console.log(item);
  return '3';
});