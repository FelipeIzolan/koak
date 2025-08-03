import coak from "./dist/index.js"

import test from "node:test";
import { Writable } from "node:stream";

test("JSON Stream", (_, done) => {
  let chunks = '';
  let stream = new Writable({
    write(chunk, _, callback) {
      chunks += chunk.toString();
      callback();
    }
  });

  let logger = coak({ label: 'test', stream });

  logger.info('log1');
  logger.warn('log2', 'log2');
  logger.error('log3');
  logger.end();

  console.log(JSON.parse(chunks));
  done();
});
