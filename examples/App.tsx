// @solid

import { StyleSheet, Text, View } from "react-native";
import { createSignal } from "solid-js";

export default function App() {
  const [counter, setCounter] = createSignal(0);
  setInterval(() => setCounter((_) => _ + 1), 1000);
  return (
    <View style={styles.container}>
      <Text>{`Counter: ${counter()}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
