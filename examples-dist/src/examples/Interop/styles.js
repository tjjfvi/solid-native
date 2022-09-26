import { StyleSheet } from "react-native";
export default StyleSheet.create({
  nestedContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    backgroundColor: "#ccc",
    paddingVertical: 12,
    paddingHorizontal: 6,
    width: "100%",
    alignContent: "center",
    alignItems: "center"
  },
  nestedSolidContainer: {
    justifyContent: "space-around",
    backgroundColor: "#aaf",
    padding: 10,
    margin: 5,
    alignContent: "center",
    alignItems: "center"
  },
  nestedReactContainer: {
    justifyContent: "space-around",
    backgroundColor: "#faa",
    padding: 10,
    margin: 5,
    alignContent: "center",
    alignItems: "center"
  },
  nestedValueText: {
    flexGrow: 0,
    fontFamily: "Verdana",
    fontSize: 14,
    margin: 0,
    padding: 0
  },
  nestedBlockDescriptionText: {
    flexGrow: 0,
    fontFamily: "Verdana",
    fontSize: 16,
    margin: 0,
    padding: 0,
    fontWeight: "bold"
  },
  nestedIncrement: {
    margin: 6,
    padding: 6,
    borderWidth: 1,
    borderColor: "#444",
    width: 200,
    marginHorizontal: "auto"
  },
  nestedIncrementText: {
    textAlign: "center",
    flexGrow: 0,
    fontFamily: "Verdana",
    fontSize: 12
  }
});