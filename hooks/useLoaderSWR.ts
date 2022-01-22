import useSWR from "swr";

export type ReadyLoader<T> = {
  status: "ready";
  value: T;
};

export type LoadingLoader<T> = {
  status: "loading";
};

export type ErrorLoader<T> = {
  status: "error";
  error: Error;
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
  const { data, error } = useSWR(key, {
    fetcher,

    ...(isImmutable ? immutableOpts : mutableOpts),
  });

  if (data) return { status: "ready", value: data };
  if (error) return { status: "error", error };
  return { status: "loading" };
}
