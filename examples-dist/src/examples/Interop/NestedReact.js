// @react
import styles from "./styles";
import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { NestedSolid } from "./NestedSolid";
export function NestedReact({
  main,
  nest
}) {
  const [val, setVal] = useState(main ?? 0);

  const increment = () => {
    setVal(_ => _ + 1);
  };

  return /*#__PURE__*/React.createElement(View, {
    style: styles.nestedReactContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.nestedBlockDescriptionText
  }, nest ? "React around Solid" : "React within Solid"), /*#__PURE__*/React.createElement(Text, {
    style: styles.nestedValueText
  }, "Main (props): ", main), /*#__PURE__*/React.createElement(Text, {
    style: styles.nestedValueText
  }, "Local (hook): ", val), /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: increment,
    style: styles.nestedIncrement
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.nestedIncrementText
  }, `Increment Local`)), nest ? /*#__PURE__*/React.createElement(NestedSolid, {
    main: main
  }) : null);
}