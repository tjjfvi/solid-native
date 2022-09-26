import { memo as _$memo } from "solid-native";
import { createComponent as _$createComponent } from "solid-native";
// @solid
import { View, Text, TouchableOpacity } from "react-native";
import { createSignal, Dynamic, For, Show } from "solid-native";
import styles from "./appStyles";
import { Counter, Periodic, Todo, Interop } from "./examples";
const examples = {
  Counter,
  Periodic,
  Todo,
  Interop
};
const exampleNames = Object.keys(examples);
export default function App(props) {
  return _App(props);
}

const _App = require("solid-native").wrapSolidJsxComponent(function App() {
  {
    const [selectedExampleName, setSelectedExampleName] = createSignal();
    return _$createComponent(View, {
      get style() {
        return { ...styles.container,
          marginTop: 50,
          marginBottom: 20
        };
      },

      get children() {
        return _$createComponent(Show, {
          get when() {
            return !!selectedExampleName();
          },

          get fallback() {
            return _$createComponent(View, {
              get children() {
                return [_$createComponent(Text, {
                  get style() {
                    return styles.selectExampleText;
                  },

                  children: "Select an example:"
                }), _$createComponent(For, {
                  each: exampleNames,
                  children: exampleName => _$createComponent(TouchableOpacity, {
                    style: {
                      width: "auto",
                      flexGrow: 0
                    },
                    onPress: () => setSelectedExampleName(exampleName),

                    get children() {
                      return _$createComponent(Text, {
                        get style() {
                          return styles.exampleName;
                        },

                        children: exampleName
                      });
                    }

                  })
                })];
              }

            });
          },

          get children() {
            return [_$createComponent(View, {
              get style() {
                return styles.exampleBack;
              },

              get children() {
                return _$createComponent(TouchableOpacity, {
                  style: {},
                  onPress: () => setSelectedExampleName(),

                  get children() {
                    return _$createComponent(Text, {
                      get style() {
                        return styles.exampleBackText;
                      },

                      children: "← Back"
                    });
                  }

                });
              }

            }), _$createComponent(View, {
              get style() {
                return styles.exampleTitle;
              },

              get children() {
                return _$createComponent(Text, {
                  get style() {
                    return styles.exampleTitleText;
                  },

                  get children() {
                    return selectedExampleName();
                  }

                });
              }

            }), _$createComponent(View, {
              get style() {
                return styles.exampleContainer;
              },

              get children() {
                return _$createComponent(Dynamic, {
                  get component() {
                    return examples[selectedExampleName()] ?? (() => null);
                  }

                });
              }

            })];
          }

        });
      }

    });
  }
}, undefined, App);