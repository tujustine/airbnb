import { useState, useEffect } from "react";
import axios from "axios";
import Constants from "expo-constants";
import { useRouter, Link } from "expo-router";
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

import { Logo, Offer } from "../../../assets/components/index";
import colors from "../../../assets/styles/colors";
import styles from "../../../assets/styles/style";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms`
        );
        // console.log(response.data);
        setRooms(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchRooms();
  }, []);

  return isLoading ? (
    <ActivityIndicator size="large" color="black" />
  ) : (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.container}>
        <View
          style={[styles.logoContainer, { marginBottom: 10, width: "100%" }]}
        >
          <Logo style={styles.logoPageHeader} />
        </View>

        <View style={{ flex: 1 }}>
          <FlatList
            // contentContainerStyle={{ paddingBottom: 50 }}
            data={rooms}
            keyExtractor={(item) => String(item._id)}
            renderItem={({ item }) => {
              return (
                <>
                  <Link href={`/room?id=${item._id}`}>
                    <View
                      style={{
                        width: 370,
                        // height: 290,
                        gap: 10,
                      }}
                    >
                      <Offer
                        pic={item.photos[0].url}
                        price={item.price}
                        title={item.title}
                        ratingValue={item.ratingValue}
                        reviews={item.reviews}
                        userPic={item.user.account.photo.url}
                      />
                    </View>
                  </Link>
                  <View
                    style={{
                      borderBottomWidth: 2,
                      marginTop: 5,
                      marginBottom: 15,
                      borderBottomColor: colors.lightGray,
                    }}
                  ></View>
                </>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
