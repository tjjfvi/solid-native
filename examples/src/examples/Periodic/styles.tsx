import { StyleSheet } from "react-native";

export default StyleSheet.create({
  countersContainer: {
    flex: 1,
    flexGrow: 1,
    marginVertical: 60,
    justifyContent: "space-around",
    // borderWidth: 1,
    // borderColor: "orange",
  },
  counterEvery: {
    fontStyle: "italic",
    fontFamily: "Verdana",
  },
  counter: {
    fontWeight: "bold",
    fontFamily: "Verdana",
    fontSize: 20,
  },
});
