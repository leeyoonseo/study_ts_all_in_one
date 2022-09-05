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
