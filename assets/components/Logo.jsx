import { Image } from "react-native";

// import styles from "../styles/style";

export function Logo({ style }) {
  return (
    <Image
      source={{
        uri: "https://img.icons8.com/?size=512&id=103424&format=png",
      }}
      style={style}
      resizeMode="contain"
    />
  );
}
