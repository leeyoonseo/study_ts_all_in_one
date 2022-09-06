import axios from "axios";

// 브라우저 fetch
// 노드 fetch
// axios = fetch (사실 상 XMLHttpRequest) + 여러기능

(async () => {
  try {
    // get, put, post 같은건 class Axios에 선언되어 있음.
    // get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
    // 결과 값 Promise<AxiosResponse<T>>;, T는 AxiosResponse의 data: T임
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    // response.data // data === any
    console.log(response.data);
  } catch (Error) {

  }
})();

// 함수에 속성 추가
const axiosA = () => { };
axiosA.b = 'b';
axiosA.c = 'c';

// AxiosInstance는 함수
// export interface AxiosInstance extends Axios {
//   (config: AxiosRequestConfig): AxiosPromise;
//   (url: string, config?: AxiosRequestConfig): AxiosPromise;
// }

// 근데 AxiosStatic가 extends로 AxiosInstance 함수를 상속받고 있다.
// Q. 객체가 함수를 상속받는게 가능한가?
// export interface AxiosStatic extends AxiosInstance {
// 이러한 특성으로 만들어진것
const axiosB = () => { }; // 함수
axiosB.create = () => { }; // 함수안에 또다른 속성으로 함수를 넣어주고 있다.
axiosB.isAxiosError = () => { };
// axiosB.name = 'axiosB';
// export interface AxiosStatic extends AxiosInstance {
//   create(config?: AxiosRequestConfig): AxiosInstance;
//   Cancel: CancelStatic;
//   CancelToken: CancelTokenStatic;
//   Axios: typeof Axios;
//   readonly VERSION: string;
//   isCancel(value: any): boolean;
//   all<T>(values: Array<T | Promise<T>>): Promise<T[]>;
//   spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R;
//   isAxiosError(payload: any): payload is AxiosError;
// }

// 그리고 AxiosInstance는 Axios를 상속받는데, Axios는 Class이다.
// Axios는 클래스면서 함수면서 객체다
// export interface AxiosInstance extends Axios {
// export class Axios {
// 따라서 3가지 방법으로 사용할 수 있다.
// 1. new axios();
// 2. axios();
// 3. axios.get();

