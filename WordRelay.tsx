// react는 UMD 모듈
// export = React; // 이것만 있으면 commonjs
// commonjs는 import React = require('react');로 import 해야하는데,
// import React from 'react; 가 되는 건 esModuleInterop:true 이기 때문에 가능
// export as namespace React; // 이것도 있으면 UMD
import React, { useState, useCallback, useRef, useEffect, FunctionComponent, FC, FormEvent, MouseEvent, ChangeEvent } from 'react';

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
// interface IWordRelay { name: string, title: string };
// const WordRelay: FunctionComponent<IWordRelay> = (props) => {
// FunctionComponent === FC (줄임말이 있음)

// react 17버전에서는 VFC가 있었음 -> 18에서 없어지고 FC로 통일됨
// VFC와 FC의 차이는 children?: ReaactNode 지원의 차이, 이후 버전에서 children을 사용안하게되고, 그러면 똑같기때문에 VFC가 사라짐
// (버전 올릴때 주의)
const WordRelay: FC = () => {
// 그외 이렇게 선언도 가능함
// function WordRelay(props: P) {

  // const [word, setWord] = useState(() => {
  //   lazy init (리렌더링 시 성능최적화를 위해, 복잡한 함수를 초기에 실행하여 기억하게 만들기 위해 아래와 같이 사용함)
  //   return 복잡함함수();
  // });
  // function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
  // const [word, setWord] = useState<'강아지'>('강아지'); // 제네릭을 통해 타입 좁히기 가능
  const [word, setWord] = useState('강아지');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputEl = useRef<HTMLInputElement>(null);

  // function useEffect(effect: EffectCallback, deps?: DependencyList): void;
  // Q. useEffect의 EffectCallback 타입의 return type이 void로 고정되어있어서 useEffect를 async로 사용할 수 없다.
  // type EffectCallback = () => (void | Destructor);
  // - async는 return 값이 Promise여야함.
  // useEffect(async () => { // (X)
  // Q. deps는 -> []인데, 이것은 무엇이냐? 
  // type DependencyList = ReadonlyArray<unknown>;
  // interface ReadonlyArray<T> { -> length가 고정이고 나머지는 array와 같은 것 (즉, 읽기 전용 array)
  // const deps: readonly any[] = [];
  useEffect(() => {
    // useEffect에서 async를 못쓰므로 아래와 같이 패턴이 강제됨
    // 1.
    // const func = async () => {
    //   await axios.post();
    // };

    console.log('useEffect');
    // 1.
    // func();

    // 2. cleanup 함수 이용 (Destructor)
    // type EffectCallback = () => (void | Destructor);
    // type Destructor = () => void | { [UNDEFINED_VOID_ONLY]: never };
    // declare const UNDEFINED_VOID_ONLY: unique symbol; => unique symbol은 Symbol()을 타이핑하는 방법
    return () => {
      console.log('useEffect cleanup');
      // cleanup 함수에 return 값은 없어야한다.
    }
  // readonly any[]를 사용해봄
  // }, deps);
  // 그냥 useEffect의 두번째 인자로 넣으면 ReadonlyArray이기에 추론이 됨
  }, []);

  // Q. useCallback도 18버전에서 바뀜 (callback: T)이 알아서 타입을 제공하지 않음
  // 17버전
  // function useCallback<T extends (...args: any[]) => any>(callback:T, deps: DependancyList): T;
  // - (...args: any[]) 타이핑이 되어있는 상태
  // 18버전
  // function useCallback<T extends Function>(callback: T, deps: DependencyList): T;
  // - Function은? 매개변수와 리턴값이 타이핑 안되어있는 상태
  // - 따라서 매개변수 타이핑을 해줘야함
  // Q. FormEvent?
  // interface FormEvent<T = Element> extends SyntheticEvent<T> {
  // 제네릭에 대상을 넣어줘야함
  const onsubmitForm = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Q. useRef 타이핑
    // - useRef는 타입이 3가지 선언되어있다.
    // 1. function useRef<T>(initialValue: T): MutableRefObject<T>; 
    // - MutableRefObject? jsx와 ref를 연결하는 역할이 아닌 값만 저장할때 사용하는 용도, state와 차이는 화면을 리렌더링 시킨다(state) 안시킨다(ref)로 구분
    //
    // 2. function useRef<T>(initialValue: T | null): RefObject<T>;
    // - RefObject? 실제 jsx에 ref로 연결한 것
    // - 2번의 예제로 useRef<HTMLHeadElement>(document.querySelector('head')); 도 가능한데, 이유는 HTMLHeadElement가 T | null 임
    // - 예제에서 !를 통해 명확하게 만들어버리면(non null assertion) null 조건에 부합하지 않으므로 useRef<HTMLHeadElement>(document.querySelector('head')!); MutableRefObject가 됨 
    //
    // 3. function useRef<T = undefined>(): MutableRefObject<T | undefined>;
    // - 위에서 이렇게 선언하면 1번 사용됨, 2번 사용되어야함
    // const inputEl = useRef(null);
    // - 이렇게 하면 2번 사용됨. 제네릭으로 타입 지정, focus 에러 안남
    // const inputEl = useRef<HTMLInputElement>(null); 
    // 만약 const inputEl = useRef<HTMLInputElement>(); 이렇게 값을 안쓰면 MutableRefObject가 됨, 초기값도 넣어야한다. (3번이 됨)
    // 3번이 초기값이 비어있는것이 만족되므로..
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

  // 타입 에러가 나면 어디서 타입을 가져오는지 확인해야한다 (네임이 같을 수 있으므로 import 확인)
  // const onClick = useCallback((e: MouseEvent<HTMLButtonElement>) => { }, []);

  // function useCallback<T extends Function>(callback: T, deps: DependencyList): T;
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
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

// Q. 타입스크립트 브랜딩 방법?
// type Destructor = () => void | { [UNDEFINED_VOID_ONLY]: never };
// - | { [UNDEFINED_VOID_ONLY]: never }은 뭘까? 찾아보는 방법: 깃헙 히스토리 파악하기
// type Brand<K, T> = K & { __brand: T } -> { __brand: T }는 실제 존재하는 속성이 아님, 이게 있어서 이 자리에 다른 것을 못 넣는다?
// type USD = Brand<number, 'USD'>

// 아래와 같은 예시가 있다고하자.
const usd2 = 10;
const eur2 = 10;
const krw2 = 2000;

// 보통은 number로 할수도있다.
function euroToUsd2(euro: number): number {
  return (euro * 1.18);
}
console.log(`USD: ${euroToUsd2(eur2)}`);
euroToUsd2(1); // 1.18
euroToUsd2(krw2); // eur to use인데 krw를 넣었을 때 막을 방법이 없다. 매개변수 euro는 number이고 return 값도 number이기 때문에, 타입에러가 아님

// 이때 브랜딩 기법을 사용하게 된다.
type Brand<K, T> = K & { __brand: T }; // 가상 속성을 사용해 새로운 타입을 만들어 넣는다.
type EUR = Brand<number, 'EUR'>;
type USD = Brand<number, 'USD'>;
type KRW = Brand<number, 'KRW'>;
// 그리고 실제로 존재하지 않는 타입이기에 as로 타입을 강제한다.
const usd = 10 as USD;
const eur = 10 as EUR;
const krw = 2000 as KRW;

function euroToUsd(euro: EUR): number {
  return (euro * 1.18);
}
console.log(`USD: ${euroToUsd(eur)}`);

euroToUsd(eur);
// euroToUsd(usd); // __brand: T로 인해서 타입이 안맞기 때문에 불가능


