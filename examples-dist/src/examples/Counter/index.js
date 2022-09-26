import { createComponent as _$createComponent } from "solid-native";
import { memo as _$memo } from "solid-native";
// @solid
import { Text } from "react-native";
import { createSignal, onCleanup } from "solid-native";
export default function CounterExample(props) {
  return _CounterExample(props);
}

const _CounterExample = require("solid-native").wrapSolidJsxComponent(function CounterExample() {
  {
    const [count, setCount] = createSignal(0);
    const interval = setInterval(() => setCount(c => c + 1), 1000);
    onCleanup(() => clearInterval(interval));
    return _$createComponent(Text, {
      get children() {
        return ["Count value is ", _$memo(() => count())];
      }

    });
  }
}, undefined, CounterExample);