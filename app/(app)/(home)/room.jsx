import { useState, useEffect } from "react";
import axios from "axios";
import Constants from "expo-constants";
import { useRouter, useLocalSearchParams } from "expo-router";
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
} from "react-native";

import { Logo } from "../../../assets/components/index";
import colors from "../../../assets/styles/colors";
import styles from "../../../assets/styles/style";

export default function Room() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [room, setRoom] = useState(null);
  const { id } = useLocalSearchParams();

  const router = useRouter();

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${id}`
        );
        // console.clear();
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
    // <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
    <SafeAreaView>
      <Text> page room : {id}</Text>
    </SafeAreaView>
  );
}
