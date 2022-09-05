function Ba(this: Window | typeof Bobj) {
  console.log(this.name);
}

const Bobj = { name: 'cho' };
const Bb = Ba.bind(Bobj);
Bb(); // 'cho'

// ThisParameterType === this 추론
// OmitThisParameter === this를 제외한 매개변수, 리턴 값 추론

// 함수자리에서 this를 추론 (this: infer U, ...args: never) =>
// type ThisParameterType<T> = T extends (this: infer U, ...args: never) => any ? U : unknown;
type BT = ThisParameterType<typeof Ba>; // this 추론

// thisparametertype이 unknown일때 T, 그게 아니면 R ? (Conditional Types 이 2번 중첩)
// 1. thisparametertype이 추론 실패하면 unknown이 나오는데, -> 즉 타입 추론이 실패했을때 함수 타입 그대로 가라.
// 타입 추론이 성공했을때, 매개변수와 리턴값을 알아내라
// 2. T extends (...args: infer A) => infer R ? (...args: A) 보면 this가 매개변수에 없다.
// 즉 this를 제외한 다른 매개변수를 가져오는 것 === 타입 추론 실패했다. === 실패했기 때문에 this를 제외한 매개변수와 리턴 값에 대해서 추론
// type OmitThisParameter<T> = unknown extends ThisParameterType<T> ? T : T extends (...args: infer A) => infer R ? (...args: A) => R : T;
type BNoThis = OmitThisParameter<typeof Bb>; // this를 없앤 함수 타입을 추출

// bind를 쓰면 this가 없는 원래 함수가 나와야하기 때문에 ThisParameterType, OmitThisParameter 둘다 이해해야함
const BExampleA = {
  name: 'cho',
  sayHello() {
    console.log(`hi ${this.name}`);
  }
}
const BSayHello = BExampleA.sayHello;
// BsayHi의 bind
// bind<T>(this: T, thisArg: ThisParameterType<T>): OmitThisParameter<T>;
const BsayHi = BExampleA.sayHello.bind({ name: 'lee' });
BsayHi(); // 'lee'

// bind의 type이 오버로딩되어있는지? => 바인드의 여러 사용법을 알아보자
// bind에다가 인수에 갯수를 늘려줄 수 있다.
// 매개변수 자리에 미리 값을 가져다 두는 것
function BExampleB(a: number, b: number, c: number, d: number, e: number, f: number) {
  return a + b + c + d + e + f;
}

// this를 null로 바인드 할때
// bind<T>(this: T, thisArg: ThisParameterType<T>): OmitThisParameter<T>;
const BExampleB1 = BExampleB.bind(null); 
BExampleB1(1, 2, 3, 4, 5, 6);

// null이 this고 1이 a
// 새롭게 바인딩 된 함수는 나머지 5개의 인수만 받아야 에러가 안남
// bind<T, A0, A extends any[], R>(this: (this: T, arg0: A0, ...args: A) => R, thisArg: T, arg0: A0): (...args: A) => R;
// 매개변수 : (this: (this: T, arg0: A0, ...args: A) => R, thisArg: T, arg0: A0)
// - this도 함수임: (this: T, arg0: A0, ...args: A) => R
// - thisArg: T 는 null
// - arg0: A0 는 1이므로 number
// - ...args는 나머지, 리턴 값은 똑같아짐
// 리턴값: (...args: A) => R;
const BExampleB2 = BExampleB.bind(null, 1); 
BExampleB2(2, 3, 4, 5, 6);

const BExampleB3 = BExampleB.bind(null, 1, 2); // 고차함수 커링 느낌
BExampleB3(3, 4, 5, 6);

const BExampleB4 = BExampleB.bind(null, 1, 2, 3);
BExampleB4(4, 5, 6); // 3개를 바인딩 하면 매개변수도 3개만 나옴

const BExampleB5 = BExampleB.bind(null, 1, 2, 3, 4);
BExampleB5(5, 6);

// 5개 부터는 에러가 나는데 왜일까? -> typescript가 더 이상의 케이스에 대해 만들지 않았기 때문에. (-> 파라미터가 엄청 많은 함수가 거의 없기에...)
const BExampleB6 = BExampleB.bind(null, 1, 2, 3, 4, 5); 
// BExampleB6(6);
BExampleB6(); // (...args: (1 | 2 | 3 | 4 | 5)[]) => number