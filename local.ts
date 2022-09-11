import passport from 'passport';
import { Strategy } from 'passport-local';

// Q. Strategy 타이핑
// - constructor가 오버로딩 되어있음 (passReqToCallback: true가 있으면 async(req, userId, password, done) 이렇게 되어야하기에...)
// declare class Strategy extends PassportStrategy {
//     constructor(
//         options: IStrategyOptionsWithRequest,
//         verify: VerifyFunctionWithRequest
//     );
//     constructor(options: IStrategyOptions, verify: VerifyFunction);
//     constructor(verify: VerifyFunction);

//     name: string;
// }

interface Option {
  usernameField: string,
  passwordField: string,
  // 타입 검사를 위에서 부터 하는데, true일 경우 Option에 boolean으로 되어있으면 OptionWithReq를 탈 수 없다.
  // - 따라서 false로 바꿔줘야함
  // passReqToCallback?: boolean;
  passReqToCallback?: false;
}

interface OptionWithReq {
  usernameField: string,
  passwordField: string,
  passReqToCallback?: true;
}

interface Done {
  (err: unknown | null, user?: Express.User | false, info?: unknown): void;
}

interface Callback {
  (userId: string, password: string, done: Done): void;
}
interface CallbackWithReq { 
  (req: Express.Request, userId: string, password: string, done: Done): void;
}

// Q. Strategy class로 타이핑 해보기
declare class S {
  // constructor은 return 타이핑이 필요없음
  constructor(option: Option, callback: Callback);
  constructor(option: OptionWithReq, callback: CallbackWithReq);

  // Q. Strategy에는 authenticate 필수 (옵셔널이 아님)
  // interface Strategy {
  //   name?: string | undefined;
  //   authenticate(this: StrategyCreated<this>, req: express.Request, options?: any): any;
  // }
  authenticate(): void; // duck typing
}

const s = new S({
  usernameField: 'userId',
  passwordField: 'password',
  passReqToCallback: false,
}, async (userId, password, done) => {
  try {
    return done(null, false, { message: '비밀번호가 틀리다.' });
  } catch (error) {
    console.error(error);
    return done(error);
  }
})

export default () => {
  passport.use('local', s);
}