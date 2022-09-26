// @solid
import { StyleSheet } from "react-native";
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 20
  },
  selectExampleText: {
    fontSize: 20,
    fontFamily: "Verdana",
    fontStyle: "italic",
    color: "#666",
    marginVertical: 12
  },
  exampleName: {
    fontSize: 20,
    fontFamily: "Verdana",
    marginVertical: 6
  },
  exampleBack: {
    width: "100%",
    justifyContent: "flex-start",
    alignContent: "space-around",
    flexDirection: "row"
  },
  exampleBackText: {
    flex: 0,
    flexGrow: 0,
    flexShrink: 1,
    fontSize: 16,
    fontFamily: "Verdana",
    color: "#888",
    paddingHorizontal: 10
  },
  exampleTitle: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 5
  },
  exampleTitleText: {
    fontSize: 20,
    fontFamily: "Verdana",
    color: "#444",
    textAlign: "center"
  },
  exampleContainer: {
    flexShrink: 1,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#888"
  }
});