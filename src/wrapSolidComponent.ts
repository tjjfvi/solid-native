import { $solidVersion } from "./symbols";

export function wrapSolidComponent<T>(Comp: T): T;
export function wrapSolidComponent(Comp: any) {
  const ReactComp = () => {
    throw new Error(
      "Solid components that do not return JSX cannot be called by React"
    );
  };
  // @ts-ignore
  ReactComp[$solidVersion] = Comp;
  return ReactComp;
}
