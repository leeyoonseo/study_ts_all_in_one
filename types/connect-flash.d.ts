declare module 'connect-flash' {
  global {
    namespace Express {
      interface Request {
        flash(message: string): void;
        flash(event: string, message: string): void;
        flash(): { [key: string]: string[] };
      }
    }
  }

  import express = require('express');
  function flash(): express.RequestHandler;

  // Q. export default를 쓴 이유?
  // - import할때, 파일에서 import해서 쓰고 있기 때문에 맞춰준것
  export default flash;
}