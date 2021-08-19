export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export enum HttpResponseCode {
  OK = 200,
  BAD_REQUEST = 400,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  UNPROCESSABLE_ENTITY = 422,
}
