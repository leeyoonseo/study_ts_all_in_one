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