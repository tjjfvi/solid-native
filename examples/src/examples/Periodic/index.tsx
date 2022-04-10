// @solid

import { View } from "react-native";
import { Counter } from "./Counter";
import styles from "./styles";

export default function PeriodicCounters() {
  return (
    <View style={styles.countersContainer}>
      <Counter />
      <Counter showEvery={2} />
      <Counter showEvery={3} />
      <Counter showEvery={5} />
      <Counter showEvery={7} />
      <Counter showEvery={9} />
      <Counter showEvery={11} />
    </View>
  );
}
