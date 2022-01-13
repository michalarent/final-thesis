import { Loading } from "carbon-components-react";
import { Loader } from "../useLoaderSWR";

export default function Await({
  data,
  children,
}: {
  data: Record<string, Loader<any>>;
  children: any;
}) {
  const isReady = Object.values(data).every(
    (loader) => loader.status === "ready"
  );

  if (isReady) {
    return children;
  } else {
    return <Loading />;
  }
}
