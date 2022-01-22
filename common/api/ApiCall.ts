import failwith from "../util/failwith";
import { HttpMethod, HttpResponseCode } from "./types";

export default async function apiCall<TRequest, TResponse>(
  url: string,
  method: HttpMethod,
  body?: TRequest
): Promise<TResponse> {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
  });

  if (response.ok) return response.json() as Promise<TResponse>;
  else
    throw new HttpError(
      response.status,
      (await response.text()) || response.statusText
    );
}

export class HttpError extends Error {
  code: HttpResponseCode;
  message: string;

  constructor(code: HttpResponseCode, message?: string) {
    message = message || "HTTP Error";
    super(message);
    this.name = "HttpError";
    this.code = code;
    this.message = message;
  }
}

export function isHttpError(e: Error): e is HttpError {
  return e.name === "HttpError";
}

export function isHttp404(e: Error) {
  return isHttpError(e) && e.code === HttpResponseCode.NOT_FOUND;
}
