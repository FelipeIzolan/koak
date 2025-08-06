# 🌴 coak

<img width="625" height="181" alt="image" src="https://github.com/user-attachments/assets/dd6bc2e2-859f-4b92-9a6d-2cc2f5cd0a03" />

## 📥 Install

```
npm install coak
```

## 🚀 Usage

```js
import coak from "coak";
import { createWriteStream } from "fs";

const stream = createWriteStream('log.json');
const logger = coak({ label: 'your-label', stream });

logger.info('Hello from coak!');
logger.end(); // <- end stream;
```

## 📓 Documentation

### coak(opts)

coak is the default export. It accepts an optional configuration object:
- `label`: Adds a custom label to each log entry;
- `stream`: A writable stream where logs will be written in JSON format;
```js
import coak from "coak";
const logger = coak();
```

### Logger
The logger object returned by `coak()` exposes the following methods:
- `info(...data)` - Creates an info-level log (level 0);
- `warn(...data)` - Creates a warning-log (level 1);
- `error(...data)` - Creates a error-log (level 2);
- `write(data, level)` *(stream-only)* - Writes a log directly to the JSON stream;
- `end()` *(stream-only)* - Finalizes the JSON and ends the writable stream;

## 🍪 Recipes

### Middleware (express-like)

```js
import coak from "coak";
import express from "express";

const app = express();
const logger = coak();

// --- middleware
app.use((req, res, next) => {
  logger.info(req.method, req.path);
  next();
});
// ---

app.get('/', (req, res) => {
  res.end('Hello, World!');
});

app.listen(3000, (err) => {
  if (err)
    throw err;
  logger.info('PORT: 3000');
});
```

### End stream on process exit

To ensure your stream ends properly and your JSON log is fully written when the process exits, use `process.on()` to handle exit signals:

```js
import coak from "coak";
import { createWriteStream } from "fs";

const stream = createWriteStream('log.json');
const logger = coak({ label: 'your-label', stream });

logger.info('Hello from coak!');

const exit = () => {
  logger.end();
  process.exit();
};

process.on('exit', exit);
process.on('SIGINT', exit); // <- CTRL + C
```

## 📜 Licenses

- [coak](https://github.com/felipeizolan/coak) - MIT
- [typescript](https://github.com/microsoft/TypeScript) - Apache-2.0
