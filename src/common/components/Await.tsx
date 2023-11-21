import { UsePromiseResult } from "@common/hooks/usePromise";
import { ErrorScreen } from "@features/ui/error-screen/ErrorScreen";
import { FullSizeSpinner } from "@features/ui/spinner/Spinner";

export function Await<T>(props: {
  value: UsePromiseResult<T>;
  children: (value: T) => JSX.Element;
  loading?: JSX.Element;
  error?: (err: Error) => JSX.Element;
}): JSX.Element;
export function Await<R>(props: {
  value: R extends UsePromiseResult<unknown>[] ? R : never;
  children: (value: R) => JSX.Element;
  loading?: JSX.Element;
  error?: (err: Error) => JSX.Element;
}): JSX.Element;
export function Await<T, R>({
  value,
  loading = <FullSizeSpinner />,
  error = (err: Error) => <ErrorScreen error={err} />,
  children
}: {
  value: UsePromiseResult<T> | (R extends UsePromiseResult<T>[] ? R : never);
  loading?: JSX.Element;
  error?: (err: Error) => JSX.Element;
  children: (value: T | T[]) => JSX.Element;
}): JSX.Element {
  if (Array.isArray(value)) {
    if (value.some(v => v.loading)) {
      return loading;
    }
    if (value.some(v => v.error)) {
      const errorResource = value.find(v => v.error);
      if (errorResource?.error) return error(errorResource.error);
    }
    return children(value.map(v => v.data) as T[]);
  }

  if (value.loading) return loading;

  if (value.error) return error(value.error);

  return children(value.data);
}
