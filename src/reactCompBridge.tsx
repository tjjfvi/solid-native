import React, { useEffect } from "react";
import {
  createRoot,
  children,
  createRenderEffect,
  getOwner,
  runWithOwner,
} from "solid-js";

import { $solidBridge } from "./symbols";
import { useOnce, useRerender } from "./util";

export function reactCompBridge(Comp: any) {
  if (!Comp[$solidBridge]) {
    const name = (Comp.displayName || Comp.name) + "_ReactBridge";
    const SolidComp = ({ solidProps }: any) => {
      const rerender = useRerender();
      const { reactProps, dispose, onRerender } = useOnce(() =>
        createRoot((dispose) => {
          const childrenMemo = children(() => solidProps.children);
          const reactProps: Record<string, any> = {};
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const owner = getOwner()!;
          let rerenderQueued = true;
          const queueRerender = () => {
            if (rerenderQueued) return;
            rerenderQueued = true;
            rerender();
          };
          const onRerender = () => {
            rerenderQueued = false;
          };
          createRenderEffect(() => {
            reactProps.children = childrenMemo();
            queueRerender();
          });
          createRenderEffect(() =>
            runWithOwner(owner, () => {
              for (const key in solidProps) {
                if (key in reactProps) continue;
                createRenderEffect(() => {
                  reactProps[key] = solidProps[key];
                  queueRerender();
                });
              }
            })
          );
          return { reactProps, dispose, onRerender };
        })
      );
      onRerender();
      useEffect(() => dispose, []);
      return <Comp {...{ ...reactProps }} />;
    };
    Object.defineProperty(SolidComp, "name", { value: name });
    Comp[$solidBridge] = SolidComp;
  }
  return Comp[$solidBridge];
}
