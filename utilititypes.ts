interface UProfile {
  name: string,
  age: number,
  married: boolean,
}

// Partial 만들기!
type UPartial<T> = {
  // Index signature
  // [key: string]: string;
  
  // Mapped Type
  // 객체의 키들을 사용
  [key in keyof T]?: T[key];
}

const cho: UProfile = {
  name: 'cho',
  age: 30,
  married: false,
};

// Partial 사용. optional로 바꾸어줌
// const newCho: Partial<UProfile> = {
//   name: 'cho',
//   age: 30,
// };

// 만든거 사용
const newCho: UPartial<UProfile> = {
  name: 'cho',
  age: 30,
};

// 하지만 Partial은 좋다고 할 수 없다.
// Pick은 원하는 것만 가져올 수 있다.
// const choPick: Pick<UProfile, 'name' | 'age'> = {
//   name: 'cho',
//   age: 30,
// };

// Pick 만들어보기
// 제네릭을 쓰면 제네릭에 대한 제한조건을 먼저 쓰면 좋다.
// UProfile 과 'name', 'age' 둘 사이의 관계가 있으므로 extends keyof T 를 써줘야한다.
type UPick<T, S extends keyof T> = {
  [key in S]: T[key];
};

const choPick: UPick<UProfile, 'name' | 'age'> = {
  name: 'cho',
  age: 30,
};

// Omit은 하나만 제외할 때 사용
// const choOmit: Omit<UProfile, 'married'> = {
//   name: 'cho',
//   age: 30,
// };

// Omit 만들어보기 -> exclude를 먼저 알아야함. -> 여러개의 utility type들을 쓰고 있음.
// Exclude는 제외하는 것
type UAnimal = 'Cat' | 'Dog' | 'Human';
type Mammal = Exclude<UAnimal, 'Human'>; // Human이 제외됨
type UExclude = Exclude<keyof UProfile, 'married'>; // married가 제외됨
const choPickandExclude: Pick<UProfile, Exclude<keyof UProfile, 'married'>> = {
  name: 'cho',
  age: 30,
};

// Omit 만들어보기 -> pick, exclude를 조합해서 만들어야함.
type UOmit<T, S extends keyof T> = Pick<T, Exclude<keyof T, S>>;
const choOmit: UOmit<UProfile, 'married'> = {
  name: 'cho',
  age: 30,
};

// Exclude, Extract 만들어보기
// 비교 (서로 반대임) - 타입에 3항 연산도 가능함..
// type Exclude<T, U> = T extends U ? never : T; // 부분 집합이면 never (없앤다.) = 맞으면 없앰
// type Extract<T, U> = T extends U ? T: never; // 부분 집합이면 남겨라 = 맞으면 추출


// Extract 추출하는것 
type Human = Extract<UAnimal, 'Human'>;

// Required - optional을  required로 바꾸고 싶을때
interface UProfileOptional {
  name?: string,
  age?: number,
  married?: boolean,
}

// optional을 required로 바꾼다.
type URequired<T> = {
  // -? 란: 물음표는 optional인데, -?를 하면 ?를 빼는 것임.
  // +?는  ?랑 똑같기 때문에 안씀.
  // 마이너스는 옵셔널을 빼는 것
  [key in keyof T]-?: T[key];
};

// const choRequired: Required<UProfileOptional> = {
//   name: 'cho',
//   age: 30,
//   married: false,
// };

const choRequired: URequired<UProfileOptional> = {
  name: 'cho',
  age: 30,
  married: false,
};

// 수정 못하게 readonly 하는 법
type UReadonly<T> = {
  readonly [key in keyof T]: T[key];
  
  // 반대로 readonly 빼기
  // -readonly [key in keyof T]: T[key];
};

const choReadonly: UReadonly<UProfileOptional> = {
  name: 'cho',
  age: 30,
  married: false,
};
// choReadonly.name = 'cho2';


// Record - 객체를 표현하는 한가지 방법
// interface URecord {
//   [key: string]: number;
// }
// 위의 방법을 간단하게 만들어 둔 것 
const recordA: Record<string, number> = { a: 3, b: 5, c: 7 };

// 객체의 키는 number, string, symbol만 올 수 있기때문에 extends keyof any를 해줘야함.
type URecord<T extends keyof any, S> = {
  [key in T]: S;
}

// NonNullable ?
type UNonA = string | null | undefined | boolean | number;
// 여기서 null과 undefined를 제외하고 가져오고 싶을때 사용
type UNonB = NonNullable<UNonA>;
// 타입들이 key에 적용되는게 있고 interface, 객체에 적용되는 것이 있어서 구분을 해야한다.
// key는 pick과 같은애들, 객체는 nonnullable과 같은 애들..
// NonNullable 만들기
type UNon<T> = T extends null | undefined ? never : T; 
type UNonC = UNon<UNonA>;

// infer
function zip(x: number, y: string, z: boolean): { x: number, y: string, z: boolean } {
  return { x, y, z };
}

// zip 함수의 매개변수의 타입을 가져오고 싶을때?
// zip을 바로 넣으면 에러가 난다 => 변수는 바로 넣을 수 없기에 typeof를 넣어줘야한다.
type UZipParams = Parameters<typeof zip>; // 튜플로 나옴
// type first = UZipParams[0]; // 이런식으로 뽑아서 타입을 사용할 수 있음, 타입 간에도 배열처럼 나오면 index로 접근할 수 있다.

// Parameters 만들기
// 함수로 제한 두기 <T extends (...args: any) => any>
// 1. <T extends (...args: any) => any> = T는 무조건 함수여야한다.
// 2. T extends (...args: infer A) => any ? A : never; -> 매개 변수 A의 순서대로 추론한다. 추론해서 값들을 돌려둔다.
type UParameters<T extends (...args: any) => any> = T extends (...args: infer A) => any ? A : never;
// infer는 extends 에서만 사용 가능하다.
// infer - 추론하는 것, 추론 조건 ? 추론 성공 시 값 : 추론 실패 시 값
// 함수의 return 타입을 가져오고 싶다.
type UReturn<T extends (...args: any) => any> = T extends (...args: any) => infer A ? A : never; 
type Ret = UReturn<typeof zip>; // return 타입

// ConstructorParameters, InstanceType
// 생성자 대상의 type 분석
// 모양이 유사하다 - abstract new (...args: any) => any 이건 생성자 모양
// type UConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer P) => any ? P : never;
// type UInstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer P ? P : any;
class UClassA {
  a: string;
  b: number;
  c: boolean;

  constructor(a: string, b: number, c: boolean) {
    this.a = a;
    this.b = b;
    this.c = c;
  }
}

const classA = new UClassA('123', 456, true);
type classAConstructorP = ConstructorParameters<typeof UClassA>;  // typeof 클래스가 생성자
type classAInstanceType = InstanceType<typeof UClassA>; 

// 클래스는 타입으로 바로 쓸 수 있다.
/// UClassA라는 타입, 정확하게는 uClassA를 타입으로 사용하는데, 저건 class가 아니라 instance이다.
const typeClassA: UClassA = new UClassA('123', 456, true); // 인스턴스 (new)