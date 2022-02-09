import useSWR, { mutate } from "swr";

export type ReadyLoader<T> = {
  status: "ready";
  value: T;
  mutate: () => void;
};

export type LoadingLoader<T> = {
  status: "loading";
  mutate: () => void;
};

export type ErrorLoader<T> = {
  status: "error";
  error: Error;
  mutate: () => void;
};

export type Loader<T> = ReadyLoader<T> | LoadingLoader<T> | ErrorLoader<T>;

export type Fetcher<Data> = (key: string, data: Data) => Data | Promise<Data>;
type Key = string | any[] | null;

const immutableOpts = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

const mutableOpts = {
  refreshInterval: 1000,
};

export default function useLoaderSWR<T>(
  key: Key,
  fetcher: Fetcher<T>,
  isImmutable?: boolean
): Loader<T> {
  const { data, error, mutate } = useSWR(key, {
    fetcher,

    ...(isImmutable ? immutableOpts : mutableOpts),
  });

  if (data) return { status: "ready", value: data, mutate };
  if (error) return { status: "error", error, mutate };
  return { status: "loading", mutate };
}
