import { useEffect, useState } from "react";

export type ResourceResult<R> = {
  revalidate: () => void;
} & (
  | {
      status: "loading";
      loading: true;
      data: undefined;
      error: null;
    }
  | {
      status: "success";
      loading: false;
      data: R;
      error: null | undefined;
    }
  | {
      status: "error";
      loading: false;
      data: undefined;
      error: unknown;
    }
);

export function usePromise<R>(func: () => Promise<R>) {
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

  const status = (data && "success") ||
                 (error && "error") || 
                 (loading && "loading");

  return {
    status,
    data,
    error,
    loading,
    revalidate
  } as ResourceResult<R>;
}
