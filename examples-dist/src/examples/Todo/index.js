import { createComponent as _$createComponent } from "solid-native";
// @solid
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { createEffect, createStore, For, onMount } from "solid-native";
import styles from "./styles";

function createLocalStore(initState) {
  const [state, setState] = createStore(initState);
  onMount(async () => {
    const item = await AsyncStorage.getItem("todos");
    if (item) setState(JSON.parse(item));
  });
  createEffect(async () => await AsyncStorage.setItem("todos", JSON.stringify(state)));
  return [state, setState];
}

export default function TodoExample(props) {
  return _TodoExample(props);
}

const _TodoExample = require("solid-native").wrapSolidJsxComponent(function TodoExample() {
  {
    const [state, setState] = createLocalStore({
      todos: [],
      newTitle: ""
    });

    const addTodo = () => setState({
      todos: [...state.todos, {
        title: state.newTitle,
        done: false
      }],
      newTitle: ""
    });

    return _$createComponent(View, {
      get style() {
        return styles.todoContainer;
      },

      get children() {
        return [_$createComponent(Text, {
          get style() {
            return styles.todoHeader;
          },

          children: "Simple Todos Example"
        }), _$createComponent(View, {
          get style() {
            return styles.todoEntry;
          },

          get children() {
            return [_$createComponent(View, {
              get style() {
                return [styles.todoItemStart];
              }

            }), _$createComponent(TextInput, {
              placeholder: "enter todo and click +",

              get value() {
                return state.newTitle;
              },

              onChange: e => setState({
                newTitle: e.nativeEvent.text
              }),

              get style() {
                return styles.todoEntryInput;
              }

            }), _$createComponent(View, {
              get style() {
                return [styles.todoItemEnd];
              },

              get children() {
                return _$createComponent(TouchableOpacity, {
                  onPress: addTodo,

                  get children() {
                    return _$createComponent(Text, {
                      get style() {
                        return [styles.todoPlusText];
                      },

                      get children() {
                        return emoji.Plus;
                      }

                    });
                  }

                });
              }

            })];
          }

        }), _$createComponent(For, {
          get each() {
            return state.todos;
          },

          children: (todo, i) => {
            return _$createComponent(View, {
              get style() {
                return styles.todoItem;
              },

              get children() {
                return [_$createComponent(View, {
                  get style() {
                    return [styles.todoItemStart];
                  },

                  get children() {
                    return _$createComponent(TouchableOpacity, {
                      onPress: e => {
                        return setState("todos", i(), {
                          done: !todo.done
                        });
                      },

                      get children() {
                        return _$createComponent(Text, {
                          get style() {
                            return {
                              opacity: todo.done ? 0.5 : 1
                            };
                          },

                          get children() {
                            return emoji.GreenCheck;
                          }

                        });
                      }

                    });
                  }

                }), _$createComponent(TextInput, {
                  get value() {
                    return todo.title;
                  },

                  onChange: e => setState("todos", i(), {
                    title: e.nativeEvent.text
                  }),

                  get editable() {
                    return !todo.done;
                  },

                  get style() {
                    return [styles.todoItemInput, {
                      color: todo.done ? "#aaa" : "#222"
                    }, {
                      textDecorationLine: todo.done ? "line-through" : "none"
                    }];
                  }

                }), _$createComponent(View, {
                  get style() {
                    return [styles.todoItemEnd];
                  },

                  get children() {
                    return _$createComponent(TouchableOpacity, {
                      onPress: () => setState("todos", t => [...t.slice(0, i()), ...t.slice(i() + 1)]),

                      get children() {
                        return _$createComponent(Text, {
                          get style() {
                            return [styles.todoXText, {
                              opacity: todo.done ? 1 : 0.5
                            }];
                          },

                          get children() {
                            return emoji.X;
                          }

                        });
                      }

                    });
                  }

                })];
              }

            });
          }
        })];
      }

    });
  }
}, undefined, TodoExample);

const emoji = {
  Plus: "\u2795",
  GreenCheck: "\u2705",
  X: "\u274C"
};