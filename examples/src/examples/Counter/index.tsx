// @solid
import { Text } from "react-native";
import { createSignal, onCleanup } from "solid-native";

export default function CounterExample() {
  const [count, setCount] = createSignal(0);
  const interval = setInterval(() => setCount((c) => c + 1), 1000);
  onCleanup(() => clearInterval(interval));
  return <Text>Count value is {count()}</Text>;
}
