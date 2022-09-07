import React, { ChangeEvent, Component, createRef, FormEvent } from 'react';

// props, state가 있을때
interface Props {
  name: string,
  title: string,
}
interface State {
  word: string,
  value: string,
  result: string,
}

// Q. 함수 선언 방식에 따라서도 기능이 다르다.
// 메서드 정의법이라고 생각할 수 있지만, 사소한 기능이 다르다. (이슈가 있다고 함) (=== 아직 ts가 완벽하지 않다를 설명하고 싶은듯)
interface A {
  a(): void;
  b: () => void;
}

// <P = {}, S = {}, SS = any> -> 기본값이 있어서 안넣어도 에러가 나지 않지만, 타입 추론을 위해 넣으면 좋다.
// interface Component<P = {}, S = {}, SS = any> extends ComponentLifecycle<P, S, SS> { }
// class Component<P, S> {
// Q. <P = {}, S = {}, SS = any> 에서 SS는 뭘까? -> snapshot???
// componentDidUpdate?(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot?: SS): void;
class WordRelay extends Component<Props, State> {
  state = {
    word: '강아지',
    value: '',
    result: '',
  };

  // Q. Ref 사용법
  // type RefCallback<T> = { bivarianceHack(instance: T | null): void }["bivarianceHack"];
  // - { bivarianceHack(instance: T | null): void }["bivarianceHack"]; 공변성, 반 공변성?과 연관있다고?
  // - etc.ts 파일에 있지만, -> return 값은 넓은 타입으로 대입, 매개변수는 좁은 타입으로 대입 가능하다.
  // - 결과는 type React.RefCallback<T> = (instance: T | null) => void -> bivarianceHack를 선언하고 뒤에서 바로 꺼내쓴 것
  // type Ref<T> = RefCallback<T> | RefObject<T> | null;
  // type LegacyRef<T> = string | Ref<T>;
  input: HTMLInputElement | null = null;
  onRefInput = (c: HTMLInputElement) => {
    this.input = c;
  }

  // interface FormEvent<T = Element> extends SyntheticEvent<T> {
  onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = this.input;
    if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
      // <K extends keyof S> -> </K>State의 Key들
      // setState<K extends keyof S>(
      // - (Pick<S, K> | S | null)) -> state에서 그 key를 Pick으로 뽑아서 쓰고 있다.
      //   state: ((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null),
      //   callback?: () => void
      // ): void;
      // Q. Pick하는 이유? 여러개 중 일부만 변경이 가능한 것은... state에서 Pick하기 때문에 가능한 것 (Pick<S, K> | S | null))
      // 전체를 하면 S, 하나거나, 일부만하거나 여러개하면 Pick<S, K>
      // this.setState({
      //   value: '지렁이, 
      //   result: '땡', 
      // });
      // Q. null 넣는 것도 가능?
      // - null 타입이 있으므로 가능
      // this.setState(null);
      this.setState({ // 전체를 하면 S
        result: '딩동댕', 
        word: this.state.value,
        value: '',
      });

      if (input) {
        input.focus();
      }
    } else {
      this.setState({
        result: '땡',
        value: '',
      });

      if (input) {
        input.focus();
      }
    }
  }

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: e.currentTarget.value,
    });
  }
  
  // Q. render의 타입
  // render(): ReactNode;
  // type ReactNode = ReactElement | string | number | ReactFragment | ReactPortal | boolean | null | undefined;
  // ReactNode는 ReactElement보다 더 확장 된 것
  render() {
    const { word, value, result } = this.state;
    const { onRefInput, onSubmitForm, onChange } = this;

    // return 'hello';

    return (
      <>
        <div>{word}</div>
        <form onSubmit={onSubmitForm}>
          <input
            ref={onRefInput}
            value={value}
            onChange={onChange}
          />
          <button>입력</button>
        </form>
        <div>{result}</div>
      </>
    )
  }
}

// Q. 함수컴포넌트와 클래스컴포넌트 차이 (타입 차이로 인해 생기는 부분)
// 함수 컴포넌트에서는 return 'string';이 안되고 클래스 컴포넌트에서는 return 'string';이 가능하다.
// - ReactElement에서는 string이 안됨
// - ReactNode에서는 string이 가능
const Parent = () => { // A === string;
  return <WordRelay name="네임" title="타이틀" />;
}; 

export default WordRelay;

// Q. namespace 방식, import 방식 뭐를 더 선호하는가?
// - namespace 방식도 겹치면 interface처럼 합쳐진다.
// - 안겹치려면 import하는게 좋다.
// - namespace는 script 태그로 불러올때 주로 사용한다.

// Q. 다른 컴포넌트에 있는 el에 접근하려면? 
// 클래스컴포넌트에서는 forwardRef를 사용하면된다.
// 훅 컴포넌트에서는 useImperativeHandle를 사용하면된다.