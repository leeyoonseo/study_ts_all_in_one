import axios, { AxiosError, AxiosResponse } from "axios";

// api test: https://jsonplaceholder.typicode.com/

// 브라우저 fetch
// 노드 fetch
// axios = fetch (사실 상 XMLHttpRequest) + 여러기능

interface Post { userId: number, id: number, title: string, body: string }
interface Created { }
interface Data { title: string, body: string, userId: number }

(async () => {
  try {
    // get, put, post 같은건 class Axios에 선언되어 있음.
    // get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
    // 결과 값 Promise<AxiosResponse<T>>;, T는 AxiosResponse의 data: T임
    // response의 타입이 const response: AxiosResponse<Post, any> 이렇게 되어있는데, 두번째 타입의 any가 싫은 경우, 제네릭으로 넘겨주면 된다.
    const response = await axios.get<Post, AxiosResponse<Post>>('https://jsonplaceholder.typicode.com/posts/1');
    // response.data // data === any
    console.log(response.data);
    // 모든 데이터가 any이므로 타이핑 필요. -> get에 제네릭으로 Post interface 전달
    console.log(response.data.userId);
    console.log(response.data.id);
    console.log(response.data.title);
    console.log(response.data.body);

    // post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
    // AxiosRequestConfig -> 설정 객체
    // Data 는 타입 검사용으로 사용하고 있다.
    const response2 = await axios.post<Created, AxiosResponse<Created>, Data>('https://jsonplaceholder.typicode.com/posts', {
      title: 'foo',
      body: 'bar',
      userId: 1,
    });
    
    // Q. data의 D 제네릭을 안쓸 건데, 왜 타이핑 되어있는가? A. 선언방식이 여러개이기 때문에 사용하는 방식이 있음.
    // post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
    // AxiosRequestConfig -> 설정 객체
    const response3 = await axios({
      method: 'post',
      url: 'https://jsonplaceholder.typicode.com/posts',
      // export interface AxiosRequestConfig<D = any> {
      //   .....
      //   data?: D; -> 어디선가 따로 쓰고 있지는 않음
      data: {
        title: 'foo',
        body: 'bar',
        userId: 1,
      }
    });

    // 그 외 다양한 방법...이 있다...
    const response4 = await axios('https://jsonplaceholder.typicode.com/posts', {
      method: 'post',
      data: {
        title: 'foo',
        body: 'bar',
        userId: 1,
      }
    });

  } catch (error) {
    // export class AxiosError<T = unknown, D = any> extends Error {
    
    // 1. as 사용해서 바로 사용
    // response가 optional
    // (error as AxiosError).response?.data

    // 2. 변수에 담기
    // const errorResponse = (error as AxiosError).response;
    
    // 3. 타입가드 (Best!!)
    // -> AxiosError가 class이기 때문에 타입 가드에서 사용할 수 있다. interface인 경우 js가 되면서 사라지므로!
    // axios에서는 isAxiosError 메서드를 제공한다. -> filter나 if문에서 사용해서 타입가드로 사용할 수 있을듯
    // if (error instanceof AxiosError) { 
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);

      // { message: '서버장애 입니다. 다시 시도해주세요.' }
      // isAxiosError를 사용하면 data가 unknown이 뜨는 경우가 있다. 이때 아래와 같이 제네릭이 없기 때문에 타입을 전달하기가 어렵다.
      // isAxiosError(payload: any): payload is AxiosError; 
      // 이럴 경우 as AxiosResponse로 처리해줘야한다.
      // console.error((error as AxiosError<{ message: string }>).response?.data.message); // as의 위치, 선언하는 interface만 다를뿐 아래와 동일함
      console.error((error.response as AxiosResponse<{ message: string }>)?.data.message);
    }
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

