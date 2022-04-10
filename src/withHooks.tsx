import React from "react";
import { createSignal } from "solid-js";

import { keyForProps } from "./keyForProps";
import { $solidOrig, $solidVersion } from "./symbols";
import { useSolidComp } from "./useSolidComp";
import { useSolidProps } from "./useSolidProps";
import { useMemoCustom } from "./util";

export type HookFn = <T>(fn: () => T) => () => T;
export function withHooks<T>(Comp: (hook: HookFn, props: T) => JSX.Element) {
  const SolidComp = Comp[$solidOrig as never] as typeof Comp;
  if (!SolidComp) throw new Error("withHooks must be passed a solid component");
  const ReactComp = (props: any) => {
    const solidProps = useSolidProps(props);
    return <_ReactComp solidProps={solidProps} />;
  };
  Object.defineProperty(ReactComp, "name", {
    value: SolidComp.name + "_SolidBridge",
  });
  const _ReactComp = ({ solidProps }: any) => {
    let isFirstRun = false;
    const { hook, runHooks, sealHooks } = useMemoCustom(() => {
      isFirstRun = true;
      const hooks: Array<() => void> = [];
      let canStillHook = true;
      const hook: HookFn = (fn) => {
        if (!canStillHook) throw new Error("Called hook late");
        const [accessor, setter] = createSignal(fn());
        hooks.push(() => setter(() => fn()));
        return accessor;
      };
      const sealHooks = () => {
        canStillHook = false;
      };
      const runHooks = () => {
        for (const fn of hooks) {
          fn();
        }
      };
      return { hook, runHooks, sealHooks };
    }, [solidProps]);
    const result = useSolidComp(SolidComp, hook, solidProps);
    if (isFirstRun) sealHooks();
    else runHooks();
    return result;
  };
  Object.defineProperty(_ReactComp, "name", {
    value: SolidComp.name + "_Solid",
  });
  // @ts-ignore
  ReactComp[$solidOrig] = ReactComp[$solidVersion] = (solidProps: any) => (
    <_ReactComp key={keyForProps(solidProps)} solidProps={solidProps} />
  );
  return ReactComp;
}
