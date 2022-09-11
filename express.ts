// Q. e? module.exports = e니까 아무 변수명으로 가져올 수 있다.
// declare function e(): core.Express;
// export = e; // 이름 상관 없음(default exports 여서 상관없음)

// express는 타이핑이 index.d.ts 와 express-serve-static-core/index.d.ts 파일에 나눠져있음 
// import * as core from 'express-serve-static-core';

import express from "express";

// 여러가지 추측을 할 수 있다.
// interface ExpressFunction {
//   (): App;
// }
// interface Express extends ExpressFunction{
//   json: () => Middleware;
//   urlencoded: ({ extended?: boolean }) => Middleware;
//   static: (path: string) => Middleware;
// }

// core.Express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/', express.static('./public'));

app.get('/', (req, res) => {

});

app.listen(8080, () => {

});