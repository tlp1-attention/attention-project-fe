import { useEffect, useState } from "react";

export type UsePromiseResult<R, E = Error> = {
  revalidate: () => void;
} & (
  | {
      loading: true;
      data: undefined;
      error: null;
    }
  | {
      loading: false;
      data: R;
      error: null | undefined;
    }
  | {
      loading: false;
      data: undefined;
      error: E;
    }
);

export function usePromise<R, E = Error>(func: () => Promise<R>) {
  const [data, setData] = useState<R | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    func()
      .then(r => setData(r))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [func]);

  const revalidate = () => {
    setData(undefined);
    setLoading(false);
    setError(null);
    func()
      .then(r => setData(r))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  };

  return {
    data,
    error,
    loading,
    revalidate
  } as UsePromiseResult<R, E>;
}
