import { StyleSheet } from "react-native";
import colors from "./colors";
import { Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: colors.background,
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },

  logoAuthPage: { height: 100, width: 100, marginTop: 20 },
  logoPageHeader: {
    width: 40,
    height: 40,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  logoContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    // width: "100%",
    // marginBottom: 10,
  },
  oneLineInput: {
    borderBottomWidth: 2,
    borderBottomColor: colors.salmon,
    marginBottom: 10,
    height: 44,
    width: 320,
  },
  textAreaInput: {
    borderWidth: 2,
    borderColor: colors.salmon,
    height: 100,
    width: 320,
    marginVertical: 10,
    padding: 10,
  },

  btnStyle: {
    borderRadius: 40,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.redBtn,
    borderWidth: 2,
    marginVertical: 15,
  },
  btnText: {
    color: colors.textGrey,
    textAlign: "center",
  },
  errorMessage: {
    textAlign: "center",
    color: colors.redBtn,
  },
  disabledButton: {
    opacity: 0.5,
  },
  displayPasswordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  displayPasswordIcon: {
    position: "absolute",
    right: 10,
  },
  displayPasswordInput: {
    width: 280,
  },
});

export default styles;
