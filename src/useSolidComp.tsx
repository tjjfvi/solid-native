import { useRef, useEffect } from "react";
import {
  createRoot,
  getOwner,
  untrack,
  children,
  createRenderEffect,
} from "solid-js";

import { useMemoCustom, useRerender } from "./util";

export function useSolidComp(Comp: any, ...args: any) {
  const result = useRef<any>();
  const rerender = useRerender();
  useEffect(() => dispose, [Comp, ...args]);
  const { dispose } = useMemoCustom(
    () =>
      createRoot((dispose) => {
        let firstRun = true;
        const owner = getOwner();
        const resultMaybeAccessor = untrack(() => Comp(...args));
        if (typeof resultMaybeAccessor === "function") {
          const ch = children(resultMaybeAccessor);
          createRenderEffect(() => {
            result.current = ch();
            if (firstRun) {
              firstRun = false;
            } else {
              setTimeout(rerender, 0);
            }
          });
        } else {
          result.current = resultMaybeAccessor;
        }
        return { owner, dispose };
      }),
    [Comp, ...args]
  );
  return result.current ?? null;
}
