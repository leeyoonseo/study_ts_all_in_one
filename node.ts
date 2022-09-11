// Q. ambient module 이란?
// declare module ...  = 타입 선언만 있는것 (특정 모듈에 대한 타이핑)
// 각각의 모듈을 별도로..
// Q. ambient module 예시 ?
// declare module 'node:fs' {
//   export * from 'fs'; -> fs에 있던 모듈들을 전부다 가져와서 똑같이 export 하겠다. ('node:fs'로 가져오면 node에서 가져오는 것이라고 명확)
// }
// declare module 'node:http' {
//   export * from 'http';
// }

import fs from 'fs';
import http from 'http';
import path from 'node:path';

// 시작 명령어: npx ts-node node.ts
http.createServer((req, res) => {
  fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
    res.writeHead(200);
    res.end(data);
  })
}).listen(8080, () => {
  console.log('서버 시작');
});