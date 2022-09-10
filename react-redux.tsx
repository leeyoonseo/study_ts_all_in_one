import React from 'react';
import { useSelector, useDispatch, Provider } from 'react-redux';
import { logIn, logOut } from './actions/user'; 
import { UserInitialState } from './reducers/user';
import { AppDispatch, RootState, store } from './redux';

const App = () => {
  // Q. useSelector 타이핑
  // export declare const useSelector: <TState = unknown, Selected = unknown>(selector: (state: TState) => Selected, equalityFn?: EqualityFn<Selected> | undefined) => Selected;
  // Q. RootState에 타입이 정상적으로 안들어가 있는데, 이유가 뭘까 - 임시로 as 추가
  const { loading, data } = useSelector((state: RootState) => state.user as UserInitialState);
  
  // Q. useDispatch 타이핑
  // export declare const useDispatch: <AppDispatch extends Dispatch<AnyAction> = Dispatch<AnyAction>>() => AppDispatch;
  const dispatch: AppDispatch = useDispatch();

  const onLogin = () => {
    dispatch(logIn({
      nickname: '강아지',
      password: '1234'
    }))
  };

  const onLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div>
      {loading 
        ? <div>로그인 중</div>
        : data
          ? <div>{data.nickname}</div>
          : '로그인 해주세요.'
      }
      {!data
        ? <button onClick={onLogin}>로그인</button>
        : <button onClick={onLogOut}>로그아웃</button>
      }
    </div>
  )
};

// Q. Provider 작업을 해야 useSelector와 useDispatch를 사용할 수 있다. (즉, 연결해줘야 react-redux를 사용할 수 있다.)
const Parent = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
};

export default App;