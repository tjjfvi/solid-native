// @solid

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedbackBase,
} from "react-native";
import {
  createEffect,
  createStore,
  For,
  onMount,
  SetStoreFunction,
  Store,
} from "solid-native";
import styles from "./styles";

function createLocalStore<T>(initState: T): [Store<T>, SetStoreFunction<T>] {
  const [state, setState] = createStore(initState);
  onMount(async () => {
    const item = await AsyncStorage.getItem("todos");
    if (item) setState(JSON.parse(item));
  });
  createEffect(
    async () => await AsyncStorage.setItem("todos", JSON.stringify(state))
  );
  return [state, setState];
}

interface Todo {
  title: string;
  done: boolean;
}

export default function TodoExample() {
  const [state, setState] = createLocalStore({
    todos: [] as Todo[],
    newTitle: "",
  });

  const addTodo = () =>
    setState({
      todos: [...state.todos, { title: state.newTitle, done: false }],
      newTitle: "",
    });

  return (
    <View style={styles.todoContainer}>
      <Text style={styles.todoHeader}>Simple Todos Example</Text>
      <View style={styles.todoEntry}>
        <View style={[styles.todoItemStart]}></View>
        <TextInput
          placeholder="enter todo and click +"
          value={state.newTitle}
          onChange={(e) => setState({ newTitle: e.nativeEvent.text })}
          style={styles.todoEntryInput}
        />
        <View style={[styles.todoItemEnd]}>
          <TouchableOpacity onPress={addTodo}>
            <Text style={[styles.todoPlusText]}>{emoji.Plus}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <For each={state.todos}>
        {(todo, i) => {
          return (
            <View style={styles.todoItem}>
              <View style={[styles.todoItemStart]}>
                <TouchableOpacity
                  onPress={(e) => {
                    return setState("todos", i(), { done: !todo.done });
                  }}
                >
                  <Text style={{ opacity: todo.done ? 0.5 : 1 }}>
                    {emoji.GreenCheck}
                  </Text>
                </TouchableOpacity>
              </View>
              <TextInput
                value={todo.title}
                onChange={(e) =>
                  setState("todos", i(), { title: e.nativeEvent.text })
                }
                editable={!todo.done}
                style={[
                  styles.todoItemInput,
                  { color: todo.done ? "#aaa" : "#222" },
                  { textDecorationLine: todo.done ? "line-through" : "none" },
                ]}
              />
              <View style={[styles.todoItemEnd]}>
                <TouchableOpacity
                  onPress={() =>
                    setState("todos", (t) => [
                      ...t.slice(0, i()),
                      ...t.slice(i() + 1),
                    ])
                  }
                >
                  <Text
                    style={[styles.todoXText, { opacity: todo.done ? 1 : 0.5 }]}
                  >
                    {emoji.X}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      </For>
    </View>
  );
}

const emoji = {
  Plus: "\u2795",
  GreenCheck: "\u2705",
  X: "\u274C",
};
