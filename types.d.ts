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
