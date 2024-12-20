import { useState, useContext } from "react";
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

import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { logout } = useContext(AuthContext);

  const router = useRouter();

  return (
    // <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
    <SafeAreaView>
      <Text> page profile</Text>
      <TouchableOpacity onPress={logout}>
        <Text style={styles.btnText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
