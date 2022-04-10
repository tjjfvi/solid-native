import { useRef, useState } from "react";

export function useOnce<T>(fn: () => T) {
  return (useRef<T>().current ??= fn());
}

export function useMemoCustom<T>(fn: () => T, deps: unknown[]): T {
  const lastDeps = useRef<unknown[]>();
  const value = useRef<T>();
  if (
    lastDeps.current &&
    lastDeps.current.length === deps.length &&
    lastDeps.current.every((x, i) => deps[i] === x)
  ) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return value.current!;
  }
  lastDeps.current = deps;
  return (value.current = fn());
}

export function useRerender(): () => void {
  const [, setState] = useState({});
  return () => setState({});
}
