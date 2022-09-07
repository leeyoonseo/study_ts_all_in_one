// react는 UMD 모듈
// export = React; // 이것만 있으면 commonjs
// commonjs는 import React = require('react');로 import 해야하는데,
// import React from 'react; 가 되는 건 esModuleInterop:true 이기 때문에 가능
// export as namespace React; // 이것도 있으면 UMD
import React, { useState, useCallback, useRef, useEffect, FunctionComponent, FC } from 'react';

// 간단한 함수 구조
// (prop) => JSX
// 이러한 함수 구조 타입이 정해져있다. FunctionComponent

// interface FunctionComponent<P = {}> {
//   (props: P, context?: any): ReactElement<any, any> | null;
// return 하는 JSX가 ReactElement

// FunctionComponent JSX-> ReactElement === JSX.Element
// react에서는 return 값 타이핑 잘 안함
// 그리고 JSX는 namespace다보니 import 따로 안해도 됨

// interface P { }
// const WordRelay = (props: P) => {

// props가 빈배열로 되어있으므로 제네릭 사용
// interface FunctionComponent<P = {}> { 
interface IWordRelay { name: string, title: string };
// const WordRelay: FunctionComponent<IWordRelay> = (props) => {
// FunctionComponent === FC (줄임말이 있음)

// react 17버전에서는 VFC가 있었음 -> 18에서 없어지고 FC로 통일됨
// VFC와 FC의 차이는 children?: ReaactNode 지원의 차이, 이후 버전에서 children을 사용안하게되고, 그러면 똑같기때문에 VFC가 사라짐
// (버전 올릴때 주의)
const WordRelay: FC<IWordRelay> = (props) => {
// 그외 이렇게 선언도 가능함
// function WordRelay(props: P) {

  const [word, setWord] = useState('강아지');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputEl = useRef(null);

  useEffect(() => {
    console.log('useEffect');
  }, []);

  const onsubmitForm = useCallback((e) => {
    e.preventDefault();
    const input = inputEl.current;
    if (word[word.length - 1] === value[0]) {
      setResult('딩동댕');
      setWord(value);
      setValue('');

      if (input) {
        input.focus();
      }
    } else {
      setResult('땡');
      setValue('');

      if (input) {
        input.focus();
      }
    }
  }, [word, value]);

  const onChange = useCallback((e) => {
    setValue(e.currentTarget.value);
  }, []);

  return (
    // Q. JSX가 에러 줄이 뜰때?
    // JSX 부분은 ts, js에 둘다 없는 부분 === react임
    // 따라서 ts가 인식할 수 없는데, 인식하려고 하면 tsconfig.json에서 jsx를 react로 설정하면된다.
    <>
      <div>{word}</div>
      <form onSubmit={onsubmitForm}>
        <input ref={inputEl}
          value={value}
          onChange={onChange}
        />
        <button>입력</button>
      </form>
      <div>{result}</div>
    </>
  )
};

export default WordRelay;