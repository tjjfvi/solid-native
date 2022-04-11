// @react

import styles from "./styles";
import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { NestedSolid } from "./NestedSolid";

type NestedReactProps = {
  main: number;
  nest?: boolean;
};
export function NestedReact({ main, nest }: NestedReactProps) {
  const [val, setVal] = useState(main ?? 0);
  const increment = () => {
    setVal((_) => _ + 1);
  };
  return (
    <View style={styles.nestedReactContainer}>
      <Text style={styles.nestedBlockDescriptionText}>
        {nest ? "React around Solid" : "React within Solid"}
      </Text>
      <Text style={styles.nestedValueText}>Main (props): {main}</Text>
      <Text style={styles.nestedValueText}>Local (hook): {val}</Text>
      <TouchableOpacity onPress={increment} style={styles.nestedIncrement}>
        <Text style={styles.nestedIncrementText}>{`Increment Local`}</Text>
      </TouchableOpacity>
      {nest ? <NestedSolid main={main} /> : null}
    </View>
  );
}
