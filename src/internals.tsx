/* eslint-disable @typescript-eslint/no-non-null-assertion */
// @react

import React from "react";
import { createMemo, untrack } from "solid-js";

import { keyForProps } from "./keyForProps";
import { reactCompBridge } from "./reactCompBridge";
import { $solidVersion } from "./symbols";

export * from "solid-js";

export { wrapSolidJsxComponent } from "./wrapSolidJsxComponent";

// Instantiates a component into an element (using solid.js-style props)
export function createComponent(Comp: any, solidProps: any) {
  if ($solidVersion in Comp)
    return untrack(() => Comp[$solidVersion](solidProps));
  const BridgeComp = reactCompBridge(Comp);
  return <BridgeComp key={keyForProps(solidProps)} solidProps={solidProps} />;
}

export function memo<T>(fn: () => T, equals: boolean) {
  return createMemo(fn, undefined, !equals ? { equals } : undefined);
}
