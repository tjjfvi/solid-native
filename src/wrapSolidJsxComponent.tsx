import React from "react";

import { keyForProps } from "./keyForProps";
import { $solidVersion, $solidOrig } from "./symbols";
import { useSolidComp } from "./useSolidComp";
import { useSolidProps } from "./useSolidProps";

export function wrapSolidJsxComponent<T>(Comp: T): T;
export function wrapSolidJsxComponent(Comp: any, name = Comp.name) {
  const ReactComp = (props: any) => {
    const solidProps = useSolidProps(props);
    return <_ReactComp solidProps={solidProps} />;
  };
  Object.defineProperty(ReactComp, "name", {
    value: Comp.name + "_SolidBridge",
  });
  const _ReactComp = ({ solidProps }: any) => useSolidComp(Comp, solidProps);
  Object.defineProperty(_ReactComp, "name", { value: name + "_Solid" });
  // @ts-ignore
  ReactComp[$solidVersion] = (solidProps: any) => (
    <_ReactComp key={keyForProps(solidProps)} solidProps={solidProps} />
  );
  // @ts-ignore
  ReactComp[$solidOrig] = Comp;
  if (name !== Comp.name) Object.defineProperty(Comp, "name", { value: name });
  return ReactComp;
}
