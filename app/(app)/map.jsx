import { useState } from "react";
import { useRouter } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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

import { Logo } from "../../assets/components/index";

import colors from "../../assets/styles/colors";
import styles from "../../assets/styles/style";

export default function Map() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  return (
    // <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
    <SafeAreaView>
      <Text> page map</Text>
    </SafeAreaView>
  );
}
