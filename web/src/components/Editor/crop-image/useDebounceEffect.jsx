import { useEffect, DependencyList } from "react";

export function useDebounceEffect(fn, waitTime, deps = null) {
  useEffect(() => {
    const t = setTimeout(() => {
      // @ts-ignore
      fn.apply(undefined, deps);
    }, waitTime);

    return () => {
      clearTimeout(t);
    };
  }, deps);
}
