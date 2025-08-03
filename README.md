# 🌴 koak

<img width="625" height="181" alt="image" src="https://github.com/user-attachments/assets/dd6bc2e2-859f-4b92-9a6d-2cc2f5cd0a03" />

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
- `label`: Adds a custom label to each log entry;
- `stream`: A writable stream where logs will be written in JSON format;
```js
import koak from "koak";
const logger = koak();
```

### Logger
The logger object returned by `koak()` exposes the following methods:
- `info(...data)` - Creates an info-level log (level 0);
- `warn(...data)` - Creates a warning-log (level 1);
- `error(...data)` - Creates a error-log (level 2);
- `write(data, level)` *(stream-only)* - Writes a log directly to the JSON stream;
- `end()` *(stream-only)* - Finalizes the JSON and ends the writable stream;

## 🍪 Recipes

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
