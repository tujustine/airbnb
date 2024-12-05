import { useState, useContext } from "react";
import axios from "axios";
import Constants from "expo-constants";
import { useRouter, Redirect } from "expo-router";
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

import { Logo, Title } from "../../assets/components/index";
import colors from "../../assets/styles/colors";
import styles from "../../assets/styles/style";

import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const { login } = useContext(AuthContext);

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await axios.post(
        `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in`,
        {
          email: email,
          password: password,
        }
      );

      login(response.data.id, response.data.token);

      Alert.alert("Succeed");
    } catch (error) {
      if (
        error.response.data.error === "This account doesn't exist !" ||
        error.response.data.error === "Unauthorized"
      ) {
        setErrorMessage("No account with this email or this password");
      } else if (error.response.data.error === "Missing parameter(s)") {
        setErrorMessage("Please fill all fields");
      } else {
        setErrorMessage("An error occurred");
        console.log(error.response.data.error);
      }
    }
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAwareScrollView
        horizontal={false}
        contentContainerStyle={[styles.container]}
        style={{
          marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
          flex: 1,
        }}
        // alwaysBounceVertical={false}
        // bounces={false}
        // overScrollMode="never"
        // showsVerticalScrollIndicator={false}
      >
        <View>
          <Logo />
          <Title title={"Sign In"} />
        </View>
        <View>
          <TextInput
            style={[styles.oneLineInput]}
            placeholder="email"
            onChangeText={(text) => {
              setEmail(text);
            }}
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <View
            style={[
              styles.oneLineInput,
              styles.displayPasswordContainer,
              { marginBottom: 25 },
            ]}
          >
            <TextInput
              style={styles.displayPasswordInput}
              autoCorrect={false}
              placeholder="password"
              secureTextEntry={!showPassword}
              onChangeText={(text) => {
                setPassword(text);
              }}
              value={password}
            />
            <TouchableOpacity
              activeOpacity={1}
              style={styles.displayPasswordIcon}
              onPress={() => {
                setShowPassword(!showPassword);
              }}
            >
              <FontAwesome
                name={showPassword ? "eye-slash" : "eye"}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          {errorMessage && (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          )}
          {isLoading ? (
            <ActivityIndicator size="large" color="black" />
          ) : (
            <>
              <TouchableOpacity
                style={[styles.btnStyle, isLoading && styles.disabledButton]}
                activeOpacity={0.8}
                onPress={() => {
                  handleSubmit();
                }}
                disabled={isLoading}
              >
                <Text style={styles.btnText}>
                  {isLoading ? "Loading..." : "Sign in"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  router.navigate("/signup");
                }}
              >
                <Text style={styles.btnText}>No account ? Register</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
