export class Failure extends Error {
  constructor(message: string) {
    super(message);
  }
}
export class CodedError extends Error {
  constructor(public code: string, public detail?: string) {
    super(`${code}` + detail ? " " + detail : "");
  }
}

export default function failwith(e: Error): never;
export default function failwith(message: string): never;
export default function failwith(message: string | Error): never {
  if (message instanceof Error) throw message;
  throw new Failure(message);
}

export function isCodeError(error: Error): error is CodedError {
  return error && "code" in error && "detail" in error;
}

export function toCodedError(error: Error): CodedError {
  if (isCodeError(error)) return error;
  const codedError = new CodedError("UNSPECIFIED", error.message);
  console.log(
    "ERROR TO TRANSFORM IS",
    error.message,
    error.stack || new Error().stack
  );
  codedError.stack = error.stack;
  codedError.message = error.message;
  return codedError;
}

export function failwithCode(code: string, detail?: string): never {
  throw new CodedError(code, detail);
}
