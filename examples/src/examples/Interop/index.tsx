// @solid

import { View, Text, TouchableOpacity } from "react-native";
import { createSignal } from "solid-native";
import { NestedReact } from "./NestedReact";
import { NestedSolid } from "./NestedSolid";
import styles from "./styles";

export default function InteropExample() {
  const [main, setMain] = createSignal(0);
  const increment = () => {
    setMain((_) => _ + 1);
  };
  return (
    <View style={styles.nestedContainer}>
      <Text
        style={[styles.nestedValueText, { fontSize: 16 }]}
      >{`Main Value: ${main()} `}</Text>
      <TouchableOpacity onPress={increment} style={styles.nestedIncrement}>
        <Text style={styles.nestedIncrementText}>{`Increment Main`}</Text>
      </TouchableOpacity>
      <View>
        <NestedSolid main={main()} nest={true} />
        <NestedReact main={main()} nest={true} />
      </View>
    </View>
  );
}
