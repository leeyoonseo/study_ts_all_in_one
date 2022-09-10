// thunk middleware (redux-thunk?)

import { AnyAction, Dispatch } from "redux";

// Q. thunk 타이핑?
type LogInRequestData = {
  nickname: string,
  password: string,
};

// TODO: error가 나서 return 값을 any로 했는데,,
export const logIn = (data: LogInRequestData) => { // async action creator
  return (dispatch: Dispatch<AnyAction>, getState: () => any) => { // async action
    dispatch(logInRequest(data));

    try {
      setTimeout(() => {
        dispatch(logInSuccess({
          userId: 1,
          nickname: '강아지',
        }));
      }, 2000);
    } catch (e) {
      if (e instanceof LogInErrorData) {
        dispatch(logInFailure(e));
      }
    }
  };
};

// action 객체를 return 하는 함수
export type LogInRequestAction = {
  type: 'LOG_IN_REQUEST',
  data: LogInRequestData,
};
const logInRequest = (data: LogInRequestData): LogInRequestAction => { // action creator라고 부름
  return { // action이라고 부름
    type: 'LOG_IN_REQUEST',
    data,
  }
};

export type LogInSuccessData = {
  userId: number,
  nickname: string,
};
export type LogInSuccessAction = {
  type: 'LOG_IN_SUCCESS';
  data: LogInSuccessData,
};
const logInSuccess = (data: LogInSuccessData): LogInSuccessAction => {
  return {
    type: 'LOG_IN_SUCCESS',
    data,
  }
};

class LogInErrorData extends Error {
  constructor(m?: string) {
    super(m);
    console.log(m);
  }
}
export type LogInFailureAction = {
  type: 'LOG_IN_FAILURE',
  error: LogInErrorData
};
const logInFailure = (error: LogInErrorData): LogInFailureAction => {
  return {
    type: 'LOG_IN_FAILURE',
    error,
  }
};

export type LogOutAction = {
  type: 'LOG_OUT'
};
export const logOut = (): LogOutAction => {
  return {
    type: 'LOG_OUT'
  }
};

export default {
  logIn,
  logOut,
};