import { View, Text, ImageBackground, Image } from "react-native";
import { StyleSheet } from "react-native";
// import { StarzRating } from "../components/index";
import StarzRating from "./StarzRating";
import colors from "../styles/colors";

const Offer = ({
  pic,
  price,
  title,
  ratingValue,
  reviews,
  userPic,
  multiPic, // boolean
  descriptionStyle,
}) => {
  return (
    <>
      <ImageBackground source={{ uri: pic }} style={styles.ImgBackground}>
        <Text style={styles.ImgBackgroundText}>{price}€</Text>
      </ImageBackground>

      <View
        style={[
          styles.offerDetails,
          descriptionStyle && styles.offerDetailsRoom,
        ]}
      >
        <View style={{ gap: 10 }}>
          <Text
            style={{ fontSize: 20, width: 300 }}
            numberOfLines={1}
            ellipsizeMode={"tail"}
          >
            {title}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <StarzRating ratingValue={ratingValue} />
            <Text style={{ color: colors.emptyStarzColor }}>
              {reviews} reviews
            </Text>
          </View>
        </View>
        <Image
          source={{ uri: userPic }}
          resizeMode="contain"
          style={styles.userPic}
        ></Image>
      </View>
    </>
  );
};

export default Offer;

const styles = StyleSheet.create({
  ImgBackground: { justifyContent: "flex-end", height: 230, width: 390 },
  ImgBackgroundText: {
    color: "white",
    fontSize: 22,
    lineHeight: 50,
    textAlign: "center",
    backgroundColor: "black",
    width: 100,
    marginBottom: 15,
  },
  offerDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userPic: { height: 70, borderRadius: "50%", width: 70 },
  offerDetailsRoom: { width: 300, marginLeft: 10, marginVertical: 10 },
});
