import { getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { getOrm } from "../db";
import User from "../db/User";

export async function getUser(authId: string) {
  const orm = await getOrm();
  const user = await orm.em.findOne(User, { authId: authId });

  return user;
}

export async function getCurrentUser(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Partial<{ name: string; email: string; authId: string }>> {
  const session = getSession(req, res);
  if (!session) return null;
  const authId = session.user.sub;

  let userEntity = await getOrCreateUser(
    authId,
    session.user.email,
    session.user
  );

  const { email, name } = userEntity;

  return {
    name,
    email,
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
    return user;
  } else {
    try {
      const newUser = orm.em.create(User, {
        authId,
        email,
        name: userInfo?.name || email,
      });
      await orm.em.persistAndFlush(newUser);

      return newUser;
    } catch (e) {
      throw e;
    }
  }
}
