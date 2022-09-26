import { createComponent as _$createComponent } from "solid-native";
// @solid
import { View, Text, TouchableOpacity } from "react-native";
import { createSignal } from "solid-native";
import { NestedReact } from "./NestedReact";
import { NestedSolid } from "./NestedSolid";
import styles from "./styles";
export default function InteropExample(props) {
  return _InteropExample(props);
}

const _InteropExample = require("solid-native").wrapSolidJsxComponent(function InteropExample() {
  {
    const [main, setMain] = createSignal(0);

    const increment = () => {
      setMain(_ => _ + 1);
    };

    return _$createComponent(View, {
      get style() {
        return styles.nestedContainer;
      },

      get children() {
        return [_$createComponent(Text, {
          get style() {
            return [styles.nestedValueText, {
              fontSize: 16
            }];
          },

          get children() {
            return `Main Value: ${main()} `;
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

              children: `Increment Main`
            });
          }

        }), _$createComponent(View, {
          get children() {
            return [_$createComponent(NestedSolid, {
              get main() {
                return main();
              },

              nest: true
            }), _$createComponent(NestedReact, {
              get main() {
                return main();
              },

              nest: true
            })];
          }

        })];
      }

    });
  }
}, undefined, InteropExample);