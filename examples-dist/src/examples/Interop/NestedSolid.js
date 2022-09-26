import { createComponent as _$createComponent } from "solid-native";
import { memo as _$memo } from "solid-native";
// @solid
import styles from "./styles";
import { View, Text, TouchableOpacity } from "react-native";
import { createSignal, Show } from "solid-native";
import { NestedReact } from "./NestedReact";
export function NestedSolid(props) {
  return _NestedSolid(props);
}

const _NestedSolid = require("solid-native").wrapSolidJsxComponent(function NestedSolid(props) {
  {
    const [val, setVal] = createSignal(props.main ?? 0);

    const increment = () => {
      setVal(_ => _ + 1);
    };

    return _$createComponent(View, {
      get style() {
        return styles.nestedSolidContainer;
      },

      get children() {
        return [_$createComponent(Text, {
          get style() {
            return styles.nestedBlockDescriptionText;
          },

          get children() {
            return props.nest ? "Solid around React" : "Solid within React";
          }

        }), _$createComponent(Text, {
          get style() {
            return styles.nestedValueText;
          },

          get children() {
            return ["Main (props): ", _$memo(() => props.main)];
          }

        }), _$createComponent(Text, {
          get style() {
            return styles.nestedValueText;
          },

          get children() {
            return ["Local (signal): ", _$memo(() => val())];
          }

        }), _$createComponent(TouchableOpacity, {
          onPress: increment,

          get style() {
            return styles.nestedIncrement;
          },

          get children() {
            return _$createComponent(Text, {
              get style() {
                return styles.nestedIncrementText;
              },

              children: `Increment Local`
            });
          }

        }), _$createComponent(Show, {
          get when() {
            return props.nest;
          },

          get children() {
            return _$createComponent(NestedReact, {
              get main() {
                return props.main;
              }

            });
          }

        })];
      }

    });
  }
}, undefined, NestedSolid);