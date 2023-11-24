import { UsePromiseResult } from "@common/hooks/usePromise";
import { ErrorScreen } from "@features/ui/error-screen/ErrorScreen";
import { FullSizeSpinner } from "@features/ui/spinner/Spinner";

/**
 * Extracts the resolved type from a UsePromiseResult tuple, e.g. 
 * 
 * @example
 * ```ts
 *  type Result = ExtractResultFrom<[UsePromiseResult<string>, UsePromiseResult<number>]>;  
 *     //^? Result is [string, number]
 * ```
 * Allow to pass an array of UsePromiseResult to Await
 * and infer the type of the children function
 */
type ExtractResultFrom<T> = {
  [P in keyof T]: T[P] extends UsePromiseResult<infer U> ? U : never;
};

/**
 * Component that allows you to wait for one or 
 * multiple {@link UsePromiseResult} to resolve, allowing to provide a loading
 * state and an error 
 */
export function Await<T>(props: {
  value: UsePromiseResult<T>;
  children: (value: T) => JSX.Element | JSX.Element[];
  loading?: JSX.Element;
  error?: (err: Error) => JSX.Element;
}): JSX.Element;
export function Await<R extends readonly [...UsePromiseResult<unknown>[]]>(props: {
  value: R;
  // Infer the param type of the children function
  // to be the resolved version of all types on R
  // as a tuple type
  children: (value: ExtractResultFrom<R extends readonly [...UsePromiseResult<unknown>[]] ? R : never>) => JSX.Element | JSX.Element[];
  loading?: JSX.Element;
  error?: (err: Error) => JSX.Element;
}): JSX.Element;
export function Await<T, R>({
  value,
  loading = <FullSizeSpinner />,
  error = (err: Error) => <ErrorScreen error={err} />,
  children
}: {
  value: UsePromiseResult<T> | (R extends [...UsePromiseResult<unknown>[]] ? R : never);
  loading?: JSX.Element;
  error?: (err: Error) => JSX.Element;
  children: (value: T | T[]) => JSX.Element | JSX.Element[];
}): JSX.Element | JSX.Element[] {

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
