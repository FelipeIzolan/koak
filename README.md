# koak

simple logger with stream support.

## 📥 Install

```
npm install koak
```

## 🚀 Usage

```js
import koak from "koak";
import { createWriteStream } from "fs";

const stream = createWriteStream('log.json');
const logger = koak({ label: 'your-label', stream });

logger.info('Hello from koak!');
logger.end(); // <- end stream;
```

## 📓 Documentation

### koak(opts)

koak is the default export. It accepts an optional configuration object:
- `label`: Adds a custom label to each log entry.
- `stream`: A writable stream where logs will be written in JSON format.

### End stream on process exit

To ensure your stream ends properly and your JSON log is fully written when the process exits, use `process.on()` to handle exit signals:

```js
import koak from "koak";
import { createWriteStream } from "fs";

const stream = createWriteStream('log.json');
const logger = koak({ label: 'your-label', stream });

logger.info('Hello from koak!');

const exit = () => {
  logger.end();
  process.exit();
};

process.on('exit', exit);
process.on('SIGINT', exit); // <- CTRL + C
```

## 📜 Licenses

- [koak](https://github.com/felipeizolan/koak) - MIT
- [typescript](https://github.com/microsoft/TypeScript) - Apache-2.0
