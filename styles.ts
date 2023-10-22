import { StyleSheet } from "react-native";
import { dims } from "./DeviceSettings";

const sharedStyles = StyleSheet.create({
  box: {
    borderWidth: 2,
    flex: 1,
    padding: 5,
    gap: 5,
    width: "100%",
  },
  screenUnpressed: {
    backgroundColor: "#DDE",
    borderRadius: 8,
    padding: 6,
    width: "100%",
  },
  screenPressed: {
    backgroundColor: "#BBE",
    borderRadius: 8,
    padding: 6,
  },
  bigButtonUnpressed: {
    backgroundColor: "#33C9FF",
    borderRadius: 8,
    padding: 6,
  },
  bigButtonPressed: {
    backgroundColor: "#85DEFF",
    borderRadius: 8,
    padding: 6,
  },
  flexFill: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    alignSelf: "flex-start",
    width: "100%",
  },
  titleText: {
    fontSize: 32,
    fontWeight: "bold",
  },
  subTitleText: {
    fontSize: 26,
  },
  labelText: {
    fontSize: 22,
  },
  text: {
    fontSize: 16,
  },
  horzContainer: {
    flexDirection: "row",
    width: "100%",
    gap: 10,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 20,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  avoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
    width: "100%",
    gap: 5,
  },
  stackContainer: {
    flex: 1,
    width: "100%",
    padding: 10,
    gap: 5,
  },
  formContainer: {
    flexDirection: "column",
    gap: 10,
    flexWrap: "wrap",
  },
  formRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  formColumn: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    padding: 7,
    width: "100%",
  },
  modalTop: {
    width: dims.width,
    height: dims.height,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#333c",
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink",
    gap: 15,
    margin: 20,
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
});

export default sharedStyles;
