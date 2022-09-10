// thunk middleware (redux-thunk?)
export const logIn = (data) => { // async action creator
  return (dispatch, getState) => { // async action
    dispatch(logInRequest(data));

    try {
      setTimeout(() => {
        dispatch(logInSuccess({
          userId: 1,
          nickname: '강아지',
        }));
      }, 2000);
    } catch (e) {
      dispatch(logInFailure(e));
    }
  };
};

// action 객체를 return 하는 함수
const logInRequest = (data) => {
  return {
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

const logInFailure = (error) => {
  return {
    type: 'LOG_IN_FAILURE',
    error,
  }
};

export type LogOutAction = {
  type: 'LOG_OUT'
};
const logOut = (): LogOutAction => {
  return {
    type: 'LOG_OUT'
  }
};

export default {
  logIn,
  logOut,
};