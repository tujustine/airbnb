import { Text, StyleSheet } from "react-native";
import colors from "../styles/colors";

export const Title = ({ title }) => {
  return <Text style={styles.title}>{title}</Text>;
};

const styles = StyleSheet.create({
  title: {
    color: colors.titleGrey,
    fontWeight: "600",
    fontSize: 24,
    textAlign: "center",
    marginVertical: 15,
  },
});
