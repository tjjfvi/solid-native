// @solid

import styles from "./styles";
import { View, Text, TouchableOpacity } from "react-native";
import { createSignal, Show } from "solid-native";
import { NestedReact } from "./NestedReact";

type NestedSolidProps = {
  main: number;
  nest?: boolean;
};
export function NestedSolid(props: NestedSolidProps) {
  const [val, setVal] = createSignal(props.main ?? 0);
  const increment = () => {
    setVal((_) => _ + 1);
  };
  return (
    <View style={styles.nestedSolidContainer}>
      <Text style={styles.nestedBlockDescriptionText}>
        {props.nest ? "Solid around React" : "Solid within React"}
      </Text>
      <Text style={styles.nestedValueText}>Main (props): {props.main}</Text>
      <Text style={styles.nestedValueText}>Local (signal): {val()}</Text>
      <TouchableOpacity onPress={increment} style={styles.nestedIncrement}>
        <Text style={styles.nestedIncrementText}>{`Increment Local`}</Text>
      </TouchableOpacity>
      <Show when={props.nest}>
        <NestedReact main={props.main} />
      </Show>
    </View>
  );
}
