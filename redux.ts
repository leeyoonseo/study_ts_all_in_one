// redux는 export = , export default가 없다.
// named export 방법만 사용 -> import { createStore, compose, legacy_createStore } from 'redux';
import { legacy_createStore as createStore, combineReducers, applyMiddleware, Middleware, AnyAction } from 'redux';
import { ThunkMiddleware } from 'redux-thunk';
import { logIn } from './actions/user';

// let initialState = {
//   user: {
//     loading: false,
//     isLoggingIn: true,
//     data: null,
//   },
//   posts: [],
// };
// const loginAction = { type: 'LOGIN' };
// const anyAction = { type: 'example', data: '1234' };

// Q. Reducer 분석
// 함수, 매개변수가 state, action이 있고 응답 값 s가 있다.
// export type Reducer<S = any, A extends Action = AnyAction> = (
//   state: S | undefined,
//   action: A
// ) => S
// export interface Action<T = any> {
//   type: T
// }
// const action = { type: 'example' };
// export interface AnyAction extends Action {
//   // Allows any extra properties to be defined in an action.
//   [extraProps: string]: any
// }
// [extraProps: string]: any => 다른 값들을 받을 수 있다.
// const anyAction = { type: 'example', data: '123' };

// Q. combineReducers 분석
// export function combineReducers<S, A extends Action = AnyAction>(
//   reducers: ReducersMapObject<S, A> // ReducersMapObject가 combineReducers의 객체 임...
// ): Reducer<CombinedState<S>, A>
//
// export type CombinedState<S> = EmptyObject & S
// export type ReducersMapObject<S = any, A extends Action = Action> = {
//   [K in keyof S]: Reducer<S[K], A>
// }
// 즉.. (헷갈린다;;)
// state => EmptyObject | undefinec | state
// action => type: T & [extraProps: string]
const reducer = combineReducers({
  user: (state, action) => {
    // return S[K]
    switch (action.type) {
      case 'login':{
        return {
          isLogginIn: true,
          data: {
            nickname: '강아지',
            password: '왈왈',
          }
        }
      }
      default:
        return state;
    }
  },
  // redux는 미리 action을 다 만들어둬야함
  posts: (state, action) => {
    // Q. state가 unknown일때
    // 1. as   
    // 2. 타입가드
    // 3. 애초에 library를 타이핑한다.
    if (Array.isArray(state)) {
      switch (action.type) {
        case 'ADD_POST': {
          return [...state, action.data];
        }
        default:
          return state;
      }
    }
  },
});

// Q. store 타입 확인
// export declare function legacy_createStore<S, A extends Action, Ext, StateExt>(
//   reducer: Reducer<S, A>,
//   preloadedState?: PreloadedState<S>, // initialState
//   enhancer?: StoreEnhancer<Ext>
// ): Store<S & StateExt, A> & Ext
// export interface Store<S = any, A extends Action = AnyAction> {
//   ....
//   dispatch: Dispatch<A>
// }
// export interface Dispatch<A extends Action = AnyAction> {
//   <T extends A>(action: T): T // 함수, T와 A AnyAction을 상속함
// }
// let store = createStore(reducer, initialState);

// export default store;

// 사용은 이렇게 할 수 있다.
// store.dispatch({ type: 'LOGIN' });
// store.dispatch({ type: 'LOGIN', data { .... } }); // AnyAction 타입이다보니 다른 타입을 넣어도됨

// store.getState();
// const nextState = {
//   isLogginIn: true,
//   data: {
//     nickname: '강아지',
//     password: '왈왈',
//   },
//   posts: [],
// };

// store.dispatch({ type: 'ADD_POST', data: { title: 'hello', content: 'redux' } });
// store.getState();
// const nextState = {
//   isLogginIn: true,
//   data: {
//     nickname: '강아지',
//     password: '왈왈',
//   },
//   posts: [{ title: 'hello', content: 'redux' }],
// };


// Q. Middleware로 작업해보기 (네이밍 겹치는 것들은 예시를 위해 let으로 재선언하여 작업)

const initialState = { // 
  user: {
    loading: false,
    isLoggingIn: true,
    data: null,
  },
  posts: [],
};

// Q. Middleware 타이핑
// export interface Middleware<
//   DispatchExt = {},
//   S = any,
//   D extends Dispatch = Dispatch
// > {
//   (api: MiddlewareAPI<D, S>): (
//     next: Dispatch<AnyAction>
//   ) => (action: any) => any
// }
const firstMiddleware: Middleware = (store) => (next) => (action) => { // store = api, next = dispath
  console.log('로깅', action);
  next(action);
};

// Q. thunkMiddleware란? ---> 이 middleware가 redux-thunk 라이브러리에 그대로 있음
// action은 반드시 객체꼴 원칙, thunk라는 미들웨어를 만들어두면 action을 함수꼴로도 만들 수 있다.
// action이 함수면 호출하고 함수가 아니면 그 객체자체를 사용
// Q. action이 함수면 뭐가 좋냐? 
// - 비동기 액션이 가능해짐, redux는 항상 동기임
const thunkMiddleware: Middleware = (store) => (next) => (action) => { // store = api, next = dispath
  if (typeof action === 'function') { // 비동기
    return action(store.dispatch, store.getState);
  }

  return next(action); // 동기
};

// Q. applyMiddleware 타입 확인
// - 최대 5개 까지 대응
// export function applyMiddleware<Ext1, Ext2, S>(
//   middleware1: Middleware<Ext1, S, any>,
//   middleware2: Middleware<Ext2, S, any>
// ): StoreEnhancer<{ dispatch: Ext1 & Ext2 }>
const enhancer = applyMiddleware(
  firstMiddleware,
  // Q. Thunkmiddleware 에러나므로 (함수꼴로 넣기때문에) 이렇게 타이핑 해줘야함
  thunkMiddleware as ThunkMiddleware
);

// enhancer를 만들어서 3번째 인수로 넘겨준다.
// Q. enhancer 타입 확인
// export declare function legacy_createStore<S, A extends Action, Ext, StateExt>(
//   reducer: Reducer<S, A>,
//   preloadedState?: PreloadedState<S>,
//   enhancer?: StoreEnhancer<Ext>
  
// ): Store<S & StateExt, A> & Ext

// export type StoreEnhancer<Ext = {}, StateExt = {}> = (
//   next: StoreEnhancerStoreCreator
// ) => StoreEnhancerStoreCreator<Ext, StateExt>
// export type StoreEnhancerStoreCreator<Ext = {}, StateExt = {}> = <
//   S = any,
//   A extends Action = AnyAction
// >(
//   reducer: Reducer<S, A>,
//   preloadedState?: PreloadedState<S>
// ) => Store<S & StateExt, A> & Ext

const store = createStore(reducer, initialState, enhancer);

// Q. logIn이 thunk라서 에러가 나는데, 해결법?
// dispatch는 원래 객체꼴만 받아야한다, logIn은 thunk라서 발생하는 에러이다.
// thunk dispatch 타입이 있다. thunk에서 가져오는게 가장 편하다 npm i redux-thunk
store.dispatch(logIn({
  nickname: '강아지',
  password: '1234',
}));

// react-redux.tsx에서 thunk까지 지원하는 컴포넌트 만들기를 위한 처리 
export type RootState = ReturnType<typeof store.getState>; // 함수의 return값을 사용하고 싶을때 ReturnType을 사용할 수 있다.
export type AppDispatch = typeof store.dispatch;

// names export 하기
export { store }; 