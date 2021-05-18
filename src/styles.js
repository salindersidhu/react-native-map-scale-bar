import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  container: {
    position: "absolute",
  },
  defaultBarStyle: {
    borderWidth: 1,
    borderStyle: "solid",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderColor: "rgba(0, 0, 0, 1)",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  defaultBarTextStyle: {
    fontSize: 10,
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 5,
    color: "rgba(0, 0, 0, 1)",
  },
});
export default Styles;
