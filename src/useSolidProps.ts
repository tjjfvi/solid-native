import { useRef, useEffect } from "react";
import {
  runWithOwner,
  createSignal,
  batch,
  createRoot,
  getOwner,
} from "solid-js";

import { $owner, $setters } from "./symbols";
import { useOnce } from "./util";

const propsProto = new Proxy(
  {},
  {
    get: (_, key, recv) => {
      const [accessor, setter] = runWithOwner(recv[$owner], () =>
        createSignal(undefined)
      );
      recv[$setters][key] = setter;
      Object.defineProperty(recv, key, {
        enumerable: true,
        get: accessor,
      });
      return accessor();
    },
  }
);

function createSolidProps(owner: any) {
  const props = Object.create(propsProto);
  props[$setters] = {};
  props[$owner] = owner;
  return props;
}

function updateSolidProps(solidProps: any, props: any) {
  batch(() => {
    for (const key in props) {
      if (key in solidProps) {
        solidProps[$setters][key](() => props[key]);
      } else {
        const [accessor, setter] = runWithOwner(props[$owner], () =>
          createSignal(props[key])
        );
        solidProps[$setters][key] = setter;
        Object.defineProperty(solidProps, key, {
          enumerable: true,
          get: accessor,
        });
      }
    }
  });
}

export function useSolidProps(props: any) {
  const { dispose, solidProps } = useOnce(() =>
    createRoot((dispose) => {
      const owner = getOwner();
      const solidProps = createSolidProps(owner);
      return { dispose, solidProps };
    })
  );
  useEffect(() => dispose, []);
  const lastProps = useRef(null);
  if (props !== lastProps.current) {
    lastProps.current = props;
    updateSolidProps(solidProps, props);
  }
  return solidProps;
}
