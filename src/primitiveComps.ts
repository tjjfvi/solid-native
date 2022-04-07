import * as solid from "solid-js";

import { createComponent } from "./internals";
import { wrapSolidComponent } from "./wrapSolidComponent";

export type Children = JSX.Element | (() => Children) | Children[];

export const For = wrapSolidComponent(solid.For) as never as <T>(props: {
  each: readonly T[] | undefined | null | false;
  fallback?: Children;
  children: (item: T, index: solid.Accessor<number>) => Children;
}) => JSX.Element;
export const Show = wrapSolidComponent(solid.Show) as never as <T>(props: {
  when: T | undefined | null | false;
  fallback?: Children;
  children: Children | ((item: NonNullable<T>) => Children);
}) => JSX.Element;
export const Switch = wrapSolidComponent(solid.Switch) as never as (props: {
  fallback?: Children;
  children: Children;
}) => JSX.Element;
export const Index = wrapSolidComponent(solid.Index) as never as <T>(props: {
  each: readonly T[] | undefined | null | false;
  fallback?: Children;
  children: (item: solid.Accessor<T>, index: number) => Children;
}) => JSX.Element;

export type MatchProps<T> = {
  when: T | undefined | null | false;
  children: Children | ((item: NonNullable<T>) => Children);
};
export const Match = wrapSolidComponent(solid.Match) as never as <T>(
  props: MatchProps<T>
) => JSX.Element;

export const Dynamic = wrapSolidComponent(<T>(
  props: T & {
    component?: (props: T) => Children,
  }
): JSX.Element => {
  const [p, others] = solid.splitProps(props, ["component"]);
  return solid.createMemo(() => createComponent(p.component, others)) as never;
})
