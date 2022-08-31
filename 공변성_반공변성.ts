// 함수간에 서로 대입할 수 있는가 없는가? 구별할 수 있어야함.
// 검색해 볼 키워드들: 공변성, 반공변성, 이변성, 불변성

// 함수를 대입할 수 있을까
function funcA(x: string): number {
  return +x;
} 

funcA('1'); // 1

type B = (x: string) => number | string;
const funcB: B = funcA; 

// funcA는 string 받아서 number를 리턴하는 함수인데,
// funcB는 string 받아서 number | string 리턴하는 함수인데 왜 type 대입이 되는가??????? = 타입이 다른데!
// ???????????????????
// => 리턴 값은 더 넓은 값으로 대입할 수 있다.
// => 즉, B가 funcA보다 더 넓게 return 하고 있으므로 가능하다 (number | string) 이므로

function funcC(x: string): number | string {
  return +x;
} 

funcC('1'); // 1

type C = (x: string) => number;
// const funcD: C = funcC; // 이렇게 할 경우에는 대입할 수 없다. 리턴 number 타입이 더 좁기 때문에.

// 매개 변수 일 경우?
function funcD(x: string | number): number {
  return 0;
}

type E = (x: string) => number; 
let functE: E = funcD; // 좁은 타입인데도 대입이 된다?
// 매개변수는 (x: string) => number 또는 (x: number) => number로 생각하면 안된다.
// 매개변수는 (x: string | number)를 하나로 보는게 안 헷갈린다. 즉 둘 중 하나만 되도 된다고 생각하는 게 좋음, 즉 return 값이랑 반대

// !!!!! 외우자
// return 값은 넓은 타입으로 대입, 매개변수는 좁은 타입으로 대입 가능하다.
function funcF(x: string | number): number {
  return 0;
}

type G = (x: string) => number | string;
const funcG: G = funcF; // return 넓게 대입 가능, args 쫍게 대입 가능

// 타입 넓히기 좁히기
// 타입 추론에서 넓히기라는 말이 나온다.
let numberA = 6; // 6이 타입으로 들어갈 수 있으나 number로 타입이 추론된다 = 이것을 타입 넓히기라고 한다. (다른 값을 넣을 가능성을 고려)

// 타입 좁히기는 타입가드 사용하는 것
// let numberA 가 string | number일때 아래와 같이 타입가드로 타입을 좁힐때, if문 내에서는 타입을 string으로 타입 추론이 좁혀진다.
// if (typeof numberA === 'string')

