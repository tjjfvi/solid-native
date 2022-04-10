import { $propsKey } from "./symbols";

let propsKeyN = 0;
export function keyForProps(solidProps: any) {
  const key = (solidProps[$propsKey] ??= propsKeyN++);
  return key;
}
