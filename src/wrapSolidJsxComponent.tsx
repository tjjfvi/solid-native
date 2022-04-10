import React from "react";

import { keyForProps } from "./keyForProps";
import { $solidVersion, $solidOrig } from "./symbols";
import { useSolidComp } from "./useSolidComp";
import { useSolidProps } from "./useSolidProps";

// This should really be a symbol, but symbols are not valid react prop keys
const $solidProps =
  "__solid-native-$solidProps-d454f9fb-35d4-4c3f-a988-df54fe9f92b4__";

export function wrapSolidJsxComponent<T>(Comp: T): T;
export function wrapSolidJsxComponent(
  Comp: any,
  name = Comp.name,
  _WrapperReactComp?: any
) {
  const _ReactComp = (props: any) => {
    const solidProps =
      $solidProps in props ? props[$solidProps] : useSolidProps(props);
    return useSolidComp(Comp, solidProps);
  };
  const ReactComp = _WrapperReactComp ?? _ReactComp;
  Object.defineProperty(ReactComp, "name", {
    value: Comp.name + "_Solid",
  });
  // @ts-ignore
  ReactComp[$solidVersion] = (solidProps: any) => (
    <ReactComp
      key={keyForProps(solidProps)}
      {...{ [$solidProps]: solidProps }}
    />
  );
  // @ts-ignore
  ReactComp[$solidOrig] = Comp;
  if (name !== Comp.name) Object.defineProperty(Comp, "name", { value: name });
  return _ReactComp;
}
