// @solid

import { View, Text, TouchableOpacity } from "react-native";
import { createEffect, createSignal, Dynamic, For, Show } from "solid-native";
import styles from "./appStyles";
import { Counter } from "./examples";

const examples = {
  Counter,
};

type ExampleName = keyof typeof examples;

const exampleNames = Object.keys(examples) as ExampleName[];

export default function App() {
  const [selectedExampleName, setSelectedExampleName] =
    createSignal<ExampleName>();

  createEffect(() => console.log(selectedExampleName()));
  return (
    <View style={{ ...styles.container, marginTop: 50, marginBottom: 20 }}>
      <Show
        when={!!selectedExampleName()}
        fallback={
          <View>
            <Text style={styles.selectExampleText}>Select an example:</Text>
            <For each={exampleNames}>
              {(exampleName) => (
                <TouchableOpacity
                  style={{ width: "auto", flexGrow: 0 }}
                  onPress={() => setSelectedExampleName(exampleName)}
                >
                  <Text style={styles.exampleName}>{exampleName}</Text>
                </TouchableOpacity>
              )}
            </For>
          </View>
        }
      >
        <View style={styles.exampleBack}>
          <TouchableOpacity style={{}} onPress={() => setSelectedExampleName()}>
            <Text style={styles.exampleBackText}>{"← Back"}</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.exampleTitleView}> */}
        <View style={styles.exampleTitle}>
          <Text style={styles.exampleTitleText}>{selectedExampleName()}</Text>
        </View>
        <View style={styles.exampleContainer}>
          <Dynamic
            component={examples[selectedExampleName()!] ?? (() => null)}
          />
        </View>
      </Show>
    </View>
  );
}
