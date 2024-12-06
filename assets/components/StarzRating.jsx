import { View, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import colors from "../styles/colors";

const StarzRating = ({ ratingValue }) => {
  const starz = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= ratingValue) {
      starz.push(
        <FontAwesome
          key={i}
          name="star"
          size={20}
          color={colors.fullStarzColor}
        />
      );
    } else {
      starz.push(
        <FontAwesome
          key={i}
          name="star"
          size={20}
          color={colors.emptyStarzColor}
        />
      );
    }
  }

  return (
    <View>
      <Text>{starz}</Text>
    </View>
  );
};

export default StarzRating;
