import { createComponent as _$createComponent } from "solid-native";
// @solid
import { View } from "react-native";
import { Counter } from "./Counter";
import styles from "./styles";
export default function PeriodicCounters(props) {
  return _PeriodicCounters(props);
}

const _PeriodicCounters = require("solid-native").wrapSolidJsxComponent(function PeriodicCounters() {
  {
    return _$createComponent(View, {
      get style() {
        return styles.countersContainer;
      },

      get children() {
        return [_$createComponent(Counter, {}), _$createComponent(Counter, {
          showEvery: 2
        }), _$createComponent(Counter, {
          showEvery: 3
        }), _$createComponent(Counter, {
          showEvery: 5
        }), _$createComponent(Counter, {
          showEvery: 7
        }), _$createComponent(Counter, {
          showEvery: 9
        }), _$createComponent(Counter, {
          showEvery: 11
        })];
      }

    });
  }
}, undefined, PeriodicCounters);