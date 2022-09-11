// Q. e? module.exports = e니까 아무 변수명으로 가져올 수 있다.
// declare function e(): core.Express;
// export = e; // 이름 상관 없음(default exports 여서 상관없음)

// express는 타이핑이 index.d.ts 와 express-serve-static-core/index.d.ts 파일에 나눠져있음 
// import * as core from 'express-serve-static-core';

import express, { Request, Response, NextFunction, RequestHandler } from "express";

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

// Q. 미들웨어가 따로 선언되어있으면 추론이 불가, 이때 타이핑 [방법 1]
// - 이때 NextFunction은 Express.NextFunction으로 안되는 이유?
// Express는 declare global로 namespace를 써서 전역에서 사용할 수 있게 했는데,
// e는 안해줘서?? e는 명시적으로 import해야 사용할 수 있다고 한다.
// -> (즉 Express.NextFunction안되고, 1. { NextFunction }으로 import하거나 express를 import하고 있으므로 2. express.NextFunciton 하면됨)
const middleware1 = (req: Request, res: Response, next: NextFunction) => { }; // 1.
// Q. Request와 Express.Request와 다른것을 가리키고 있는데 결론은 왜 같은가?
// Request가 Express.Request를 extends하고 있기 때문에 아예 같지는 않음
const middleware2 = (req: Express.Request, res: Express.Response, next: express.NextFunction) => { }; // 2.
// 즉 확장이 가능 (import 해오는 것과 네이밍이 겹치면 에러가 나기때문에 declare global을 사용한다.(99줄 참고))
// interface Response { // Express.Response 확장이 아니며 Response를 확장
//   testName: '강아지',
// }

// Q. 미들웨어가 따로 선언되어있으면 추론이 불가, 이때 타이핑 [방법 2]
// interface RequestHandler<
//   P = core.ParamsDictionary,
//   ResBody = any,
//   ReqBody = any,
//   ReqQuery = core.Query,
//   Locals extends Record<string, any> = Record<string, any>
// > extends core.RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> {}
// Q. 제네릭을 사용하여 any 타입 타이핑하기
const middleware4: RequestHandler<
  { paramType: string },
  { message: string },
  { bodyType: number },
  { queryType: boolean },
  { localType: unknown }
> = (req, res, next) => {
  req.params.paramType;
  req.body.bodyType;
  req.query.queryType;
  res.locals.localType;
    
  // res.body
  res.json({
    message: 'hello',
  })
};


// Q. get 타이핑
// <
//   Route extends string,
//   P = RouteParameters<Route>,
//   ResBody = any,
//   ReqBody = any,
//   ReqQuery = ParsedQs,
//   Locals extends Record<string, any> = Record<string, any>
// >(
//   path: Route,
//   ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>>
// ): T;
// 미들웨어는 requestHandler 타입
app.get('/', (req, res) => {

});

// app.use((err, req, res, next) => {
//   console.log(err.status);
// });

app.listen(8080, () => {

});

// Q. declare global {} 만든 이유는? -> 직접 수정하여 사용하기 위함 (확장)
// declare global {}, declare namespace, declare module은 여러번 선언하면 interface 처럼 합쳐진다.
// 즉, 나중에 확장이나 수정이 가능하다. === 내가 고쳐쓸 수 있다.

// Q. import 해온 { Request, Response, NextFunction, RequestHandler } interface를 로컬에서 선언한것과 합치려면?
// 1. export 하지 않아도 자동으로 합쳐진다. (ts에서 하나로 만들기때문)
// 2. 네이밍이 동일하면 충돌나기 때문에 declare global {} 이 존재하는것
// ex:
declare global {
  namespace Express {
    export interface Response {
  
    }
  
    export interface Request { 
      testName: '강아지',
    }

  }
}