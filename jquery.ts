// 파일 내부에 모듈 관련된 내용이 있으면 파일 인식이 달라진다. (모듈시스템인지, 전역 스크립트인지)
// import $ from 'jquery';
// export {} 

$('p').removeClass('myClass noClass').addClass('yourClass');
$(['p', 't']).text('hello');

const tag = $('ul li').addClass(function (index) {
  return `item-${index}`;
});

$(tag).html(function (i: number) {
  console.log(this);

  return `${$(this).data('name')} 입니다`;
});

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