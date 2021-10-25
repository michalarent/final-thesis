import { useRouter } from "next/router";
import useSWR from "swr";
import Router from "next/router";

export interface IUserProfile {
  email: string;
  name: string;
  new: boolean;
  createdAt: Date;
  imageUrl?: string;
  authId: string;
}

const fetcher = (url) =>
  fetch(url)
    .then((r) => r.json())
    .then((data) => {
      return { user: data?.user || null };
    });

export function useUser(
  {
    redirectTo,
    redirectIfFound,
  }: { redirectIfFound?: string; redirectTo?: string } = {
    redirectTo: "/api/auth/login",
  }
): IUserProfile {
  const { data, error } = useSWR("/api/user", fetcher);

  const user = data?.user as IUserProfile;

  const finished = Boolean(data);
  const hasUser = Boolean(user);
  const router = useRouter();

  return user
    ? {
        ...user,
      }
    : null;
}
