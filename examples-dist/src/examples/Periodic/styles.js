import { StyleSheet } from "react-native";
export default StyleSheet.create({
  countersContainer: {
    flex: 1,
    flexGrow: 1,
    marginVertical: 30,
    justifyContent: "space-around"
  },
  counterEvery: {
    fontStyle: "italic",
    fontFamily: "Verdana"
  },
  counter: {
    fontWeight: "bold",
    fontFamily: "Verdana",
    fontSize: 20,
    lineHeight: 24
  }
});