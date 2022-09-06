"use strict";
// // // 타입가드
// // // - 실패
// // const isRejected = (input: PromiseSettledResult<unknown>): input is PromiseRejectedResult => {
// //   return input.status === 'rejected';
// // };
// // // - 성공
// // const isFulfilled = <T>(input: PromiseSettledResult<T>): input is PromiseFulfilledResult<T> => {
// //   return input.status === 'fulfilled';
// // };
// // // Promise -> Pending -> Settled(fulfilled, Rejected)
// // // promises.then().catch() <- 둘다 settled 임
// // const promises = await Promise.allSettled([Promise.resolve('a'), Promise.resolve('b')]);
// // // 에러를 성공 실패 여부 상관없이 완료되었다고 넓게(PromiseSettledResult) 추론함.
// // // 이때 실패한 것을 모으고 싶다면..
// // // const errors = promises.filter((promise) => promise.status === 'rejected'); // 실패한 것을 모아두는 코드
// // // 이렇게 했는데도 rejected가 아니고 settled로 넓게 추론하고 있음
// // // 이때 커스텀 타입가드를 통해 추론한다.! PromiseRejectedResult가 되었다.
// // // 정확한 타입을 추론할 수 있다.
// // const errors = promises.filter(isRejected);
// // export { };
// // readonly
// // interface A {
// //   readonly a: string;
// //   b: string;
// // }
// // const aaaa: A = { a: 'hello', b: 'word' };
// // aaaa.a = '1234;'
// // 인덱스트 시그니처
// type A = {[key: string]: number}; // 어떤 key든 간에 문자열이고 그 값들은 number
// const aaaa: A = { a: 3, b: 5, c: 5, d: 123};
// // 맵드 타입드
// type B = 'Human' | 'Mammal' | 'Animal'; // - interface는 | (또는)이 안된다. -> 인터페이스에서는 &이 안된다.
// type AA = {[key in B]: number}; // key가 B의 3개 문자열 중에 하나
// const aaaaa: AA = { Human: 123, Mammal: 5, Animal: 7};
// // 클래스일 경우
// class C  {
//   a: string;
//   b: number;
//   constructor(a: string, b: number = 123) { // 기본 값이 있을때는 ?를 안 붙여도 됨
//     this.a = '123';
//     this.b = 123;
//   }
//   method() {}
// }
// const c = new C('123', 456);
// // class 이름은 그 자체로 타입이 될 수 있다.
// // new C를 타입으로 가르키는 타입
// type CC = C;
// const cc: C = new C('123');
// // class 자체를 가르키는 타입
// const e: typeof C = C; // C는 클래스 자체를 가르키는 타입은 [typeof C], 클래스 이름은 인스턴스를 가르킨다. [C]
// class D  {
//   // #이 붙으면 private인데, typescript의 private과는 다르다.
//   // typescript (이것을 쓰는 것을 추천) - protected등 다른 키워드들도 있기 때문에 정교하게 사용 가능함
//   // 대신 typescript에 private는 실제 코드에서는 public으로 바뀐다.
//   // 하지만 실제 개발 시 typqscript에서 private를 public으로 사용할 수 없기에 (에러) 개발 시 문제가 안된다고본다.
//   private a: string = '123';
//   // javascript
//   #b: number = 123;
//   method() {
//     // private일 경우 자기 class 내부에서만 쓸 수 있다.
//     console.log(this.a, this.#b);
//   }
// }
// interface E {
//   readonly a: string;
//   b: string;
//   // private a: string;
//   // protected  b: string;
//   // public c: string;
// }
// // implements - class는 interface를 구현(implements)할 수 있다.
// // interface가 있으면 class는 interface를 따라야한다. (즉 F가 E를 따라야한다.)
// // interface와 implements는 js가 되면 사라진다. -> 경고를 통해 class의 모양을 interface로 통제할 수 있다.
// class F implements E {
//   // 내부에서 키워드 사용가능하므로 굳이 implements 사용안한다고 함(=이건 개취)
//   // 객체지향을 중시할 경우 사용
//   // - 추상에 의존하고 구현에 의존하지 말라를 원칙적으로 지키기 위해서 사용해도됨
//   // - 추상(interface)과 구현(class)
//   a: string = '123';
//   b: string = 'word';
//   // 기본은 public이라서 따로 안써도 됨, 인스턴스에서 일반적으로 접근할 수 있는 것(내외부 사용 가능)
//   // public c: string = 'wow';
//   // 일반적으로 접근 할 수 없음. 클래스 안에서만 사용해야함(외부에서 사용할 수 없다.)
//   // private a: string = '123';
//   // class 안에서 사용할 수 있는데 클래스 밖에서 사용할 수 없다. 하지만 상속받고 나서는 사용 가능
//   // protected b: string = 'word';
//   // 키워드 섞어서 복합적으로 사용 가능
//   // private readonly a: string = '123';
// }
// class G extends F {
//   // F를 상속받고 있기 때문에 F의 protected 프로퍼티 사용 가능
//   method() {
//     // console.log(this.a); // private여서 사용 불가
//     console.log(this.b);
//     // console.log(this.c);
//   }
// }
// // new F().a;
// // new F().b;
// // 추상화
// // - class도 추상 클래스가 가능하다
// abstract class H {
//   // 추상 클래스가 좋은 점은 추상 메서드 사용이 가능하다.
//   // 클래스를 추상적으로 대충 모양만 만들어두고 이것을 extends할때 추상 클래스 사용
//   // 따라서 추상 클래스가 있으므로 interface(추상) implements하는 것에 대한 고민은 필요할 듯!
//   // 추상 메서드는 반드시 상속받았을때 구현해야한다.
//   abstract method(): void;
//   // 추상 메서드 외 실제 메서드를 가지고 있을 수도 있다.
//   method2() {
//     return '3';
//   }
// }
// class I extends H {
//   method() {
//     console.log('추상 메서드는 반드시 상속받았을때 구현해야한다.');
//   }
// }
// // b는 옵셔널, interface나 type에서도 사용 가능
// function abc(a: number, b?: number) { }
// abc(1);
// abc(1, 2);
// function abcd(...args: number[]) { }
// abcd(1);
// abcd(1, 2);
// abcd(1, 2, 3);
// // 제네릭: 사용할때 타입이 정해짐, extends를 통해 제한할 수 있다.
// function add<T extends number | string>(x: T, y: T): T {
//   return x + y;
// }
// // 같은 타입의 인수를 넘길 수 있도록 한다.
// add(1, 2); // 3
// add('1', '2'); // 12
// // 제네릭을 여러개 만들수도있고, 각 각 제한할 수도 있다.
// function add2<T extends number, K extends string>(x: T, y: K): T {
//   return x + y;
// }
// add2(1, '2');
// // 제네릭의 제한방법
// function add3<T extends string>(x: T): T { return x };
// //<T extends {...}>
// function add4<T extends { a: string }>(x: T): T { return x };
// add4({ a: 'hello' });
// //<T extends any[]>
// function add5<T extends string[]>(x: T): T { return x };
// add5(['1', '2', '3']);
// // 함수 모양으로 제한하기, 콜백함수들을 보통 많이 제한함
// //<T extends (...args: any) => any>
// function add6<T extends (a: string) => number>(x: T): T { return x };
// add6((a) => +a);
// // 모든 콜백 함수를 사용하려고 할때
// //<T extends (...args: any) => any>
// // 제한이없기 때문에 any 써도 상관은 없다고함 (잘 없다고함)
// function add7<T extends (...args: any) => any>(x: T): T { return x };
// add7((a) => +a);
// // 생성자
// //<T extends abstract new (...args: any) => any>
// function add8<T extends abstract new (...args: any) => any>(x: T): T { return x };
// // 생성자만 가능
// class A8 {} // 클래스 A는 A자체가 타입
// class A9 {
//   constructor() {
//     // 컨스트럭트 타입도 아래와 같이 처리
//     // function add8<T extends abstract new (...args: any) => any>(x: T): T { return x };
//   }
// } // 클래스 A는 A자체가 타입
// add8(A8);
// // 제네릭도 기본 값을 넣어야하는 경우가 있다 = jsx 문법일 경우 헷갈려함
// // 기본 값 (추론을 못할때 쓰기 때문), 인수가 넘어오면 추론을 다시해서 타입을 덮어쓰기때문에 상관없다.
// function add9<T extends unknown>(x: T): T { return x };
// function add10<T = unknown>(x: T): T { return x };
// function add11<T,>(x: T): T { return x }; // 콤마(,) 찍어도 되긴하는데, 의도가 보이지 않아서 오타와 구분하기 어려움. (권장x = 개취)
// add9(1);
// add9('2');
// add10(1);
// add10('1');
// // 제네릭 분석
// interface Array<T> {
//   forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
// }
// // 제네릭 선언 방법
// // type A<T> =
// // class A < T > {}
// // 제네릭의 타입 추론 - 제네릭으로 인하여 가능
// [1, 2, 3].forEach(value => value); // number
// ['1', '2', '3'].forEach(value => value); // string
// [true, false, true].forEach(value => value); // boolean
// ['123', 123, true].forEach(value => value); // string | number | boolean
// // map 분석
// interface Array<T> {
//   map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
// }
// // T = number
// // callbackfn의 return 값의 type이 string이며 === U, 따라서 전체의 리턴 값은 string[]이다.
// const strings = [1, 2, 3].map(item => item.toString()); // string[]
// const numbers = [1, 2, 3].map(item => item + 1); // number[]
// // filetr 제네릭
// // 제네릭이 여러번 선언되어있는 경우? 같은 함수가 여러가지 방법으로 사용되는 경우 타입이 여러번 선언되어 있을수 있다.
// interface Array<T> {
//   filter<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[];
//   filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): T[];
// }
// // filter<number extends number>(predicate: (value: number, index: number, array: number[]) => value is number, thisArg?: any): number[];
// const filtered = [1, 2, 3, 4, 5].filter(value => value % 2); // number[]
// // 제대로 타입을 못 찾는 경우
// // 의도한 것은 string[]인데, 추론을 잘 못하고 있다.
// // filter<(string | number) extends (string | number)>(predicate: (value: (string | number), index: number, array: (string | number)[]) => value is (string | number), thisArg?: any): (string | number)[];
// // 2번째것이 안되는이유: filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): T[]; === T가 (string | number)이기때문에 return 값을 제대로 추론하기 위해서는 이것을 사용할 수 없다.
// const predicate = (value: string | number): value is string => typeof value === 'string'; // 커스텀 타입 가드를 통해서 string으로 변경함 (value is string)
// const filtered2 = ['1', 2, '3', 4, 5].filter(predicate); // (string | number)[]
// // 타입 선언에서 predicate에 커스텀 타입 가드를 했으면 test에서도 커스텀 타입가드를 해야함
// // const test = ['1', 2].filter<string extends string | number>(value => typeof value === 'string');
// const test = ['1', 2].filter<string>(predicate); // 이건 에러가 안나는 것이 T는 string | number지만 S는 string으로 넣어줬고, predicate 함수도 커스텀 타입가드를 만족하기 때문!
// 빈 객체 타입 {}와 Object, 4.8 업데이트 (베타)
// 빈객체와 Object는 객체아니야 하는데 문자열이 대입이 된다.
// {}, Object? === 모든 타입(null과 undefined 제외)... 모양이 객체라서 객체라고 착각하면 안된다.
const o1 = 'hello';
const o2 = 'hi';
// object가 실제 객체를 뜻한다.
// const o3: object = 'h1';
const o4 = { hello: 'world' }; // object라고 바로 넣는 것을 지양, interface, type, class 쓰길 바란다.
const o5 = 'h1';
// unknown도 모든 타입을 다 받을 수 있다. any보다 좀 더 낮은 타입으로 타입을 나중에 직접 정해줘야한다.
// unknown을 쓰는 것을 더 권장
// unknown = {} | null | undefined (4.8버전에서 이 공식이 성립)
// 4.7버전에서는 unknown인 변수를 if문안에 넣으면 unknown이 나온다.
// if문안에 들어가면 타입가드로 null 과 undefined가 떨어져나가는데, 그렇기 때문에 unknown = {}가 된다.
if (o5) {
    o5; // 4.8 버전에서는 unknown인 것을 넣으면 타입이 {}이렇게 나오는데, (나는 왜 4.7 버전인데?)
    // 여튼 {} 타입은 모든 타입을 가리키는 것이다. 
}
else {
    o5; // 타입 가드로 인해 unknown = null | undefined
}
