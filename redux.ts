// redux는 export = , export default가 없다.
// named export 방법만 사용 -> import { createStore, compose, legacy_createStore } from 'redux';
import { legacy_createStore as createStore, combineReducers } from 'redux';

const initialState = {
  user: {
    isLoggingIn: true,
    data: null,
  },
  posts: [],
};

const loginAction = { type: 'LOGIN' };
const anyAction = { type: 'example', data: '1234' };

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
  posts: (state, action) => {
    switch (action.type) {
      // redux는 미리 action을 다 만들어둬야함
      case 'ADD_POST': {
        return [...state, action.data];
      }
      default:
        return state;
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
const store = createStore(reducer, initialState);

export default store;

// 사용은 이렇게 할 수 있다.
// store.dispatch({ type: 'LOGIN' });
// store.dispatch({ type: 'LOGIN', data { .... } }); // AnyAction 타입이다보니 다른 타입을 넣어도됨

store.getState();
// const nextState = {
//   isLogginIn: true,
//   data: {
//     nickname: '강아지',
//     password: '왈왈',
//   },
//   posts: [],
// };

store.dispatch({ type: 'ADD_POST', data: { title: 'hello', content: 'redux' } });
store.getState();
// const nextState = {
//   isLogginIn: true,
//   data: {
//     nickname: '강아지',
//     password: '왈왈',
//   },
//   posts: [{ title: 'hello', content: 'redux' }],
// };