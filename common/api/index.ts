import { NextApiRequest, NextApiResponse } from "next";
import { HttpError, isHttpError } from "./ApiCall";
import { HttpMethod, HttpResponseCode } from "./types";
import { IUserProfile } from "../../hooks/user";
import { identity } from "ramda";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { getSession } from "@auth0/nextjs-auth0";
import { getOrm } from "../../db";
import User from "../../db/User";

type ApiEndpointEnvironment = {
  req: NextApiRequest;
  res: NextApiResponse;
  user?: IUserProfile;
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
  return (options?.allowAnonymous ? identity : withApiAuthRequired)(
    async function (req: NextApiRequest, res: NextApiResponse) {
      if (!handlers[req.method])
        throw new HttpError(HttpResponseCode.METHOD_NOT_ALLOWED);
      console.log(`${req.method} ${req.url}`);
      const request =
        req.method === "GET" ? req.query : { ...req.query, ...req.body };
      try {
        const user = await getCurrentUser(req, res);
        const response =
          (await handlers[req.method](request, {
            req,
            res,
            user,
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
    }
  );
}

export async function getCurrentUser(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<IUserProfile> {
  const session = getSession(req, res);
  if (!session) return null;
  const authId = session.user.sub;

  let userEntity = await getOrCreateUser(
    authId,
    session.user.email,
    session.user
  );

  const { email, name, createdAt, imageUrl } = userEntity;

  return {
    name,
    email,
    createdAt,
    imageUrl,
    new: userEntity.new,
    authId,
  };
}

export async function getOrCreateUser(
  authId: string,
  email: string,
  userInfo?: any
): Promise<User> {
  // prevent multiple users from creating when multiple requests go at the same time with no user.
  const orm = await getOrm();
  const user = await orm.em.findOne(User, { authId });
  if (user) {
    user.imageUrl = userInfo.picture;
    await orm.em.persistAndFlush(user);
    return user;
  } else {
    try {
      console.log(`New user logged in: ${email}. Creating an entity.`);
      const newUser = orm.em.create(User, {
        authId,
        email,
        name: userInfo?.name || email,
        imageUrl: userInfo?.picture,
      });
      await orm.em.persistAndFlush(newUser);

      return newUser;
    } catch (e) {
      throw e;
    }
  }
}
