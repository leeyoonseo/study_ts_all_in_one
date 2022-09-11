// - 파일명이 꼭 types.d.ts일 이유는 없음(상관없음, ts가 d.ts파일이면 다 읽어들임)

// Q. 별도의 파일로 분리하고 나서는 declare global 사용 시 오히려 에러가나는데?
// - declare global의 조건이 있는데, 파일내에 import, export가 declare global 바깥에 있어야한다.
// 1. 파일내에 import나 export가 없을 때
interface Error { // 안해도 합쳐질때는 굳이 declare global 할 필요 없음 (타입스크립트는 지정한 폴더내 ts를 합쳐줌)
  status: number;
}

// 2. 파일내에 import나 export가 있을 때
// declare global {
//   interface Error {
//     status: number;
//   }
// }
// 이런식으로 global을 export하는 것이 아니더라도 가짜로 있어야함
// export { };

declare global {
  namespace Express {
    interface User {
      phone: number;
    }
  }
}

export { };
// Q. 왜 import나 export가 있어야하는가? (타입 선언만 있는 모듈이 ambient)
// - import나 export가 없을 경우 typescript는 파일을 그냥 script 파일로 인지한다.
// - declare global 하려면 파일이 모듈 시스템이어야 한다.
// - 그렇기 때문에 파일이 모듈 시스템이 되려면 import, export가 있어야한다.   
// 즉, 무언가를 import하거나 export하거나.. 무언가에 대한 것은 상관은 없음 (import, export 행위가 중요)