// 다른 라이브러리 구조등을 참조하기 
declare module 'react-native-keyboard-aware-scrollview' {
  import * as React from 'react';
  // ViewProps 에러가 안나는것?
  // 보통 라이브러리들이 ViewProps 만들어놔서 에러가안날수 있음
  // - 커스텀한 타입일 경우에는 에러가 나므로 아래처럼 작업해줄 수 있음
  // class KeyboardAwareScrollViewComponent extends React.Component<ViewProps & { abc: string }> {}
  class KeyboardAwareScrollViewComponent extends React.Component<ViewProps> {}
  class KeyboardAwareScrollView extends KeyboardAwareScrollViewComponent {}
  export { KeyboardAwareScrollView };
}

export { };