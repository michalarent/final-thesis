import { NextApiRequest, NextApiResponse } from "next";
import { HttpError, isHttpError } from "./ApiCall";
import { HttpMethod, HttpResponseCode } from "./types";
import { identity } from "ramda";

type ApiEndpointEnvironment = {
  req: NextApiRequest;
  res: NextApiResponse;
};

type FullHandlerType<
  TInputs extends Record<HttpMethod, unknown>,
  TResponses extends Record<HttpMethod, unknown>
> = {
  GET: ApiHandler<TInputs["GET"], TResponses["GET"]>;
  POST: ApiHandler<TInputs["POST"], TResponses["POST"]>;
  DELETE: ApiHandler<TInputs["DELETE"], TResponses["DELETE"]>;
  PUT: ApiHandler<TInputs["PUT"], TResponses["PUT"]>;
  PATCH: ApiHandler<TInputs["PATCH"], TResponses["PATCH"]>;
};

type ApiHandler<TInput, TResponse> = (
  input: TInput,
  env: ApiEndpointEnvironment
) => Promise<TResponse>;

export type ApiEndpointOptions = {
  allowAnonymous?: boolean;
};

export default function apiEndpoint<
  TInputs extends Record<HttpMethod, unknown>,
  TResponses extends Record<HttpMethod, unknown>
>(
  handlers: Partial<FullHandlerType<TInputs, TResponses>>,
  options?: ApiEndpointOptions
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (!handlers[req.method])
      throw new HttpError(HttpResponseCode.METHOD_NOT_ALLOWED);
    console.log(`${req.method} ${req.url}`);
    const request =
      req.method === "GET" ? req.query : { ...req.query, ...req.body };
    try {
      const response =
        (await handlers[req.method](request, {
          req,
          res,
        })) || {};
      if (res.writableEnded || !response) return;
      res.statusCode = 200;
      res.json(response);
    } catch (e) {
      if (isHttpError(e)) {
        res.statusCode = e.code;
      } else {
        res.statusCode = 500;
      }
      console.error(e);
      if (res.writableEnded) return;
      if (e.message) res.send(e.message);
      res.end();
    }
  };
}
