import { StyleSheet } from "react-native";
export default StyleSheet.create({
  todoContainer: {
    flex: 1,
    flexGrow: 1,
    marginTop: 30,
    justifyContent: "flex-start",
    width: "100%",
    alignItems: "flex-start",
    paddingHorizontal: 10
  },
  todoHeader: {
    textAlign: "center",
    width: "100%",
    fontWeight: "bold",
    fontFamily: "Verdana",
    fontSize: 24,
    fontStyle: "italic",
    marginBottom: 16
  },
  todoEntry: {
    flexDirection: "row",
    width: "100%",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12
  },
  todoEntryInput: {
    flexGrow: 1,
    fontWeight: "bold",
    fontFamily: "Verdana",
    fontSize: 20,
    borderWidth: 1,
    borderColor: "#444",
    padding: 6,
    marginHorizontal: 6
  },
  todoItem: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    marginVertical: 6
  },
  todoPlusText: {
    fontSize: 20
  },
  todoItemInput: {
    flexGrow: 1,
    fontWeight: "bold",
    fontFamily: "Verdana",
    fontSize: 20,
    borderWidth: 1,
    borderColor: "#444",
    padding: 6,
    marginHorizontal: 6
  },
  todoXText: {
    fontSize: 20
  },
  todoItemStart: {
    width: "10%",
    alignItems: "center",
    flexGrow: 0,
    flexShrink: 0
  },
  todoItemEnd: {
    flexGrow: 0,
    flexShrink: 0,
    width: "10%",
    alignItems: "center"
  }
});