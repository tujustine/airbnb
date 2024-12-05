import { useState, useEffect } from "react";
import axios from "axios";
import Constants from "expo-constants";
import { useRouter, Link } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  SafeAreaView,
  Platform,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  ScrollView,
  Image,
  Pressable,
  ImageBackground,
  FlatList,
} from "react-native";

import { Logo } from "../../../assets/components/index";
import colors from "../../../assets/styles/colors";
import styles from "../../../assets/styles/style";

export default function Home() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rooms, setRooms] = useState(null);

  const router = useRouter();

  const handleStarzRating = (ratingValue) => {
    const starz = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= ratingValue) {
        starz.push(
          <FontAwesome name="star" size={24} color={colors.fullStarzColor} />
        );
      } else {
        starz.push(
          <FontAwesome name="star-o" size={24} color={colors.fullStarzColor} />
        );
      }
    }
    return starz;
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms`
        );
        // console.clear();
        // console.log(response.data);
        setRooms(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchRooms();
  }, []);

  return (
    <SafeAreaView>
      {/* // <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}> */}

      <View
        style={{ borderBottomWidth: 1, borderBottomColor: colors.textGrey }}
      >
        <Image
          source={{
            uri: "https://img.icons8.com/?size=512&id=103424&format=png",
          }}
          style={{
            width: 50,
            height: 50,
            alignSelf: "center",
          }}
          resizeMode="contain"
        ></Image>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <>
          <View
            horizontal={false}
            contentContainerStyle={{}}
            style={{
              marginTop:
                Platform.OS === "android" ? Constants.statusBarHeight : 0,
            }}
          >
            <FlatList
              data={rooms}
              keyExtractor={(item) => String(item._id)}
              renderItem={({ item }) => {
                return (
                  <Link href={`/room?id=${item._id}`}>
                    <View>
                      <ImageBackground
                        source={{ uri: item.photos[0].url }}
                        resizeMode="cover"
                        style={{
                          flex: 1,
                          justifyContent: "flex-end",
                          height: 200,
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontSize: 25,
                            lineHeight: 50,
                            textAlign: "center",
                            backgroundColor: "black",
                            width: 100,
                            marginBottom: 15,
                          }}
                        >
                          {item.price}€
                        </Text>
                      </ImageBackground>

                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <View style={{ gap: 5 }}>
                          <Text>{item.title}</Text>
                          <View style={{ flexDirection: "row" }}>
                            {/* <Text>{handleStarzRating(item.ratingValue)}</Text> */}
                            <Text>{item.reviews} reviews</Text>
                          </View>
                        </View>
                        <Image
                          source={{ uri: item.user.account.photo.url }}
                          resizeMode="contain"
                          style={{ height: 50, borderRadius: "50%", width: 50 }}
                        ></Image>
                      </View>
                    </View>
                  </Link>
                );
              }}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
