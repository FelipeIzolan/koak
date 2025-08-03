import type { Writable } from "stream";

export type Level = 'info' | 'warn' | 'error';
export type Logger = {
  stream?: Writable,
  info(...data: string[]): void,
  warn(...data: string[]): void,
  error(...data: string[]): void,
  write(data: string[], level: Level): void,
  end(): void
}

const formatter = (() =>
  new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  })
)();

export const message = (data: string, level: Level, label?: string) => {
  let date = new Date();
  let time = formatter.format(date);
  let code = level == 'info' ? 36 : level == 'warn' ? 33 : 31;
  return (
    `\x1b[2m${time}\x1b[0m ` +
    `\x1b[${code}m[${level}]\x1b[0m ` +
    (label ? `\x1b[1m${label}\x1b[0m: ` : '') +
    data
  );
}

export const json = (data: string[], level: Level) => {
  return JSON.stringify({
    time: Date.now(),
    data,
    level: level == 'info' ? 0 : level == 'warn' ? 1 : 2
  });
}

export default function coak(options: { label?: string, stream?: Writable } = {}): Logger {
  let {
    label,
    stream
  } = options;

  let first = true;
  if (stream)
    stream.write('[');

  return {
    info(...data) {
      let _data = data.join(' ');
      console.log(message(_data, 'info', label));
      this.write(data, 'info');
    },
    warn(...data) {
      let _data = data.join(' ');
      console.log(message(_data, 'warn', label));
      this.write(data, 'warn');
    },
    error(...data) {
      let _data = data.join(' ');
      console.log(message(_data, 'error', label));
      this.write(data, 'error');
    },
    write(data, level) {
      if (stream) {
        let chunk = json(data, level);
        if (!first)
          stream.write(',' + chunk);
        else {
          stream.write(chunk);
          first = false;
        }
      }
    },
    end() {
      if (stream)
        stream.end(']');
    }
  };
}
