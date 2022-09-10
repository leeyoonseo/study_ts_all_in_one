import { Reducer } from 'redux';
import { LogInSuccessAction, LogInSuccessData, LogOutAction } from "../actions/user";

// 2.
// Q. 타입 추론이 제대로 되면 typeof initialState하면 되는데, 그게 안될경우?
// - 따로 타이핑해야함
interface InitialState {
  isLoggingIn: boolean,
  data: LogInSuccessData | null,
};

const initialState = {
  isLoggingIn: false,
  data: null,
};

// 1. 타입 선언
// const userReducer = (prevState = initialState, action: LogInSuccessAction | LogOutAction) => { 
// 2. 지정된 Reducer의 제네릭 활용
const userReducer: Reducer<InitialState, LogInSuccessAction | LogOutAction> = (prevState = initialState, action) => { 
  switch (action.type) {
    case 'LOG_IN_SUCCESS':
      return {
        ...prevState,
        data: action.data,
      }
    case 'LOG_OUT':
      return {
        ...prevState,
        data: null,
      }
    default:
      return prevState;
  }
};

export default userReducer;