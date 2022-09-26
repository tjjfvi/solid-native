import { createComponent as _$createComponent } from "solid-native";
// @solid
import { createSignal, Show } from "solid-native";
import styles from "./styles";
import { Text } from "react-native";
export function Counter(props) {
  return _Counter(props);
}

const _Counter = require("solid-native").wrapSolidJsxComponent(function Counter(props) {
  {
    const [counter, setCounter] = createSignal(0);
    setInterval(() => setCounter(_ => _ + 1), 1000);

    const base = () => props.showEvery ?? 1;

    const isMultiple = () => counter() % base() === 0;

    return _$createComponent(Show, {
      get when() {
        return isMultiple();
      },

      get fallback() {
        return _$createComponent(Text, {
          get style() {
            return styles.counterEvery;
          },

          get children() {
            return `Every ${base()}`;
          }

        });
      },

      get children() {
        return _$createComponent(Text, {
          get style() {
            return styles.counter;
          },

          get children() {
            return `Counter: ${counter()}`;
          }

        });
      }

    });
  }
}, undefined, Counter);