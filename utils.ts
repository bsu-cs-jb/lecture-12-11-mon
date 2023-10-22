export function gennum(): number {
  const randInt = Math.random() * 10 ** 17;
  const perfNowInt = (performance.now() * 10 ** 10) % 10 ** 17;
  const p = Math.round(randInt + perfNowInt);
  return p;
}
const ALPHA = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "~!@#$%^&*()[]{}<>/|,.+=-?:;_";
const DICTIONARY = NUMBERS + ALPHA + SYMBOLS;
const DICT_LENGTH = DICTIONARY.length;
export function divmod(x: number, y: number): [div: number, rem: number] {
  const rem = x % y;
  const div = (x - rem) / y;
  return [div, rem];
}
export function encodeNumber(n: number, length?: number): string {
  if (length === undefined) {
    length = Math.ceil(Math.log10(n) / Math.log10(DICT_LENGTH));
    console.log(`Calculated length: ${length}`);
  }
  let c = n;
  let id = "";
  for (const _ of range(length)) {
    const [div, rem] = divmod(c, DICT_LENGTH);
    id = DICTIONARY.at(rem) + id;
    c = div;
  }
  return id;
}

export function decodeId(id: string): number {
  let num = 0;
  let pwr = 1;
  for (let i = id.length - 1; i >= 0; i--) {
    num += DICTIONARY.indexOf(id[i]) * pwr;
    pwr *= DICT_LENGTH;
  }
  return num;
}

export function genid(): string {
  const num = gennum();
  const id = encodeNumber(num, 9);
  return id;
}

export function range(startOrEnd: number, end?: number): number[] {
  if (end) {
    return Array.from({ length: end - startOrEnd }, (v, i) => startOrEnd + i);
  } else {
    return Array.from({ length: startOrEnd }, (v, i) => i);
  }
}

export function log(...data: any[]) {
  console.log(`${ts()}:`, ...data);
}

export function rand(n = 2) {
  return (Math.random() * 10 ** n).toFixed().toString().padStart(2, "0");
}

export function ts(
  {
    hours,
    minutes,
    seconds,
    ms,
  }: {
    hours: boolean;
    minutes: boolean;
    seconds: boolean;
    ms: boolean;
  } = {
    hours: false,
    minutes: false,
    seconds: true,
    ms: true,
  },
) {
  const timestamp = new Date();
  let result = "";
  if (hours) {
    if (result) {
      result += ":";
    }
    result += timestamp.getHours().toString().padStart(2, "0");
  }
  if (minutes) {
    if (result) {
      result += ":";
    }
    result += timestamp.getMinutes().toString().padStart(2, "0");
  }
  if (seconds) {
    if (result) {
      result += ":";
    }
    result += timestamp.getSeconds().toString().padStart(2, "0");
  }
  if (ms) {
    if (result) {
      result += ".";
    }
    result += timestamp.getMilliseconds().toString().padStart(3, "0");
  }
  return result;
}
