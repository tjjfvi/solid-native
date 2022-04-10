// @solid

import { createSignal, Show } from "solid-native";
import styles from "./styles";
import { Text } from "react-native";

type CounterProps = {
  showEvery?: number;
};
export function Counter(props: CounterProps) {
  const [counter, setCounter] = createSignal(0);
  setInterval(() => setCounter((_) => _ + 1), 1000);

  const base = () => props.showEvery ?? 1;
  const isMultiple = () => counter() % base() === 0;

  return (
    <Show
      when={isMultiple()}
      fallback={<Text style={styles.counterEvery}>{`Every ${base()}`}</Text>}
    >
      <Text style={styles.counter}>{`Counter: ${counter()}`}</Text>
    </Show>
  );
}
