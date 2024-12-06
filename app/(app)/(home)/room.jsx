import { useState, useEffect } from "react";
import axios from "axios";
import Constants from "expo-constants";
import { useRouter, useLocalSearchParams } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  SafeAreaView,
  Platform,
  View,
  Text,
  ActivityIndicator,
  Pressable,
} from "react-native";

import { Logo, Offer } from "../../../assets/components/index";
import colors from "../../../assets/styles/colors";
import styles from "../../../assets/styles/style";

export default function Room() {
  const [isLoading, setIsLoading] = useState(true);
  const [room, setRoom] = useState(null);
  const [showDescription, setShowDescription] = useState(false);

  const { id } = useLocalSearchParams();

  const router = useRouter();

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${id}`
        );
        // console.log(response.data);
        setRoom(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchRoom();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View
        style={[
          {
            justifyContent: "flex-start",
            flex: 1,
            justifyContent: "space-around",
            backgroundColor: colors.background,
            marginTop:
              Platform.OS === "android" ? Constants.statusBarHeight : 0,
          },
        ]}
      >
        <View
          style={[
            styles.logoContainer,
            {
              alignItems: "center",
              flexDirection: "row",
              width: "50%",
              justifyContent: "space-between",
              marginLeft: 15,
            },
          ]}
        >
          <Pressable
            onPress={() => {
              router.back();
            }}
          >
            <Feather name="arrow-left" size={24} color="black" />
          </Pressable>
          <Logo style={[styles.logoPageHeader]} />
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
          <>
            <View style={{ flex: 1 }}>
              <Offer
                pic={room.photos[0].url}
                price={room.price}
                title={room.title}
                ratingValue={room.ratingValue}
                reviews={room.reviews}
                userPic={room.user.account.photo.url}
                descriptionStyle={true}
              />

              <View style={{ width: 360, alignSelf: "center" }}>
                <Text
                  numberOfLines={showDescription ? 0 : 3}
                  ellipsizeMode={"tail"}
                >
                  {room.description}
                </Text>
                <Pressable
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    marginVertical: 10,
                    // backgroundColor: "red",
                    width: 100,
                    height: 20,
                  }}
                  onPress={() => {
                    setShowDescription(!showDescription);
                  }}
                  // suppressHighlighting={true}
                >
                  <Text style={{ color: colors.textGrey }}>Show more</Text>
                  <AntDesign
                    name="caretdown"
                    size={13}
                    color={colors.textGrey}
                  />
                </Pressable>
              </View>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
