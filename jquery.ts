// 파일 내부에 모듈 관련된 내용이 있으면 파일 인식이 달라진다. (모듈시스템인지, 전역 스크립트인지)
// import $ from 'jquery';
// export {}

const $p = $('p'); // JQuery<HTMLElement> -> JQuery가 type도 있고 interface도 있으므로 구분 잘 해야함

// removeClass(className_function?: JQuery.TypeOrArray<string> | ((this: TElement, index: number, className: string) => string)): this;
// type TypeOrArray<T> = T | T[];
// 풀이
// removeClass(className_function?: string | string[] | ((this: TElement, index: number, className: string) => string)): this;
$p.removeClass('myClass noClass').addClass('yourClass');
// Q. 어떻게 메소드 체이닝이 되지? 
// return값을 확인해보면 return 값이 this다. (=== : this;)
// this이기 때문에 $p가 return된다.

// (this: TElement, index: number, className: string) => string)
// 이때 this는 매개변수에 넣지 않는다.
// document.querySelector('h1')?.addEventListener(function () {
//   console.log(this); // this는 HTMLHeadingElement
// });
// type을 확인해보면 this를 첫번째 매개변수로 타이핑한 것을 확인 할 수 있다. === 타이핑일뿐이지, 실제 매개변수가 아니다.
// typescript 함수에서 첫번째 매개변수가 this면 없는 것으로 생각해야한다.
$p.removeClass((index, className) => {
  return 'myClass';
});

// <T extends JQuery.PlaninObject>(object: T): JQuery<T>;
// interface PlaninObject<T = any> {
//  [key: string]: T; // T는 any이고... 아무거나 다 된다는 뜻
// }
// 그리고 결국은 JQuery<T>임
const $PAndT = $(['p', 't']);

// text(text_function: string | number | boolean | ((this: TElement, index: number, text: string) => string | number | boolean)): this;
$PAndT.text('hello');
// (this: TElement, index: number, text: string) => string | number | boolean)
// $PAndT.text(function(index, text) { // index: number, text: string
//   console.log(this);
//   return 'hello'; // string | number | boolean
// });

const $li = $('ul li');

// addClass(className_function: JQuery.TypeOrArray<string> | ((this: TElement, index: number, currentClassName: string) => string)): this;
// type TypeOrArray<T> = T | T[];
// 풀이
// addClass(className_function: string | string[] | ((this: TElement, index: number, currentClassName: string) => string)): this;
const tag = $li.addClass(function (index) {
  return `item-${index}`;
});

// html(htmlString_function: JQuery.htmlString |
//   JQuery.Node |
//   ((this: TElement, index: number, oldhtml: JQuery.htmlString) => JQuery.htmlString | JQuery.Node)): this;
// type Node = Element | Text | Comment | Document | DocumentFragment;
// 풀이
// html(htmlString_function: string |
//   Element | Text | Comment | Document | DocumentFragment |
//   ((this: TElement, index: number, oldhtml: string) => string | Element | Text | Comment | Document | DocumentFragment)): this;
// ???? Element - 태그 / Text - 비어있어서 확인 불가 / Comment - CharacterData로 되어있으나 무엇인지 알 수 없음
// return this이기 때문에 메서드 체이닝이 가능
$(tag).html(function (i: number) {
  console.log(this);
  return `${$(this).data('name')} 입니다`;
});

$(tag).html('<div>hello</div>');
// 위의 풀이과정으로 봤을 때, Node, Element등... DOM API를 쓸 수 있다.
// interface HTMLDivElement extends HTMLElement {
// interface HTMLElement extends Element, DocumentAndElementEventHandlers, ElementCSSInlineStyle, ElementContentEditable, GlobalEventHandlers, HTMLOrSVGElement {
// extends 하고 있기 때문에 가능
const div = document.createElement('div');
div.innerHTML = 'hello';
$(tag).html(div);

// documentFragment도 가능 하기에...
const docfrag = document.createDocumentFragment();
$(tag).html(docfrag);

// document도 가능하기에
$(tag).html(document);

// Q. typescript가 commonjs로 module.exports 하는 법?
// - javascript 일때
// const $ = require('jquery);
// module.exports = jQuery;
// - typescript 일때
// import $ = require('jquery);
// export = jQuery;
// - 모르겠을때???
// import * as $ from 'jquery === import $ = require('jquery);

// Q. 모듈시스템 흐름 (예시 react를 import할 때)
// import React from 'react'; - 원칙적으로는 옳바르지않다
// export = React; (=== module.exports = React)하고 있기 때문에 commonjs 문법 (export as namespace React가 있어서 엄밀히는 UMD)
// 따라서 import React = require('react') (=== import * as React from 'react')해야한다.
// 하지만 esModuleInterop: true로 설정하면, import React from 'react';가 가능하게 하는 것이다. (앞의 * as를 제거해도됨)

// Q. 모든 라이브러리가 commonjs? -> No
// export default -> esmodule
// export = $ -> commonjs

// Q. namespace
// declare namespace JQuery { ... }
// - namespace는 script src로 불러오는 라이브러리에서 주로 쓴다. (전역) 즉, JQuery로 묶어준 것.
// - declare에 여러개의 변수를 만들었는데, 이름 충돌이 나니까 하나의 이름으로 묶어줬다 ?
declare namespace JNamespace1 {
  const aa: string;
  const bb: string;
  const cc: string;
};

JNamespace1.aa;