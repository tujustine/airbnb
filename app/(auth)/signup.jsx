import { useState, useContext } from "react";
import axios from "axios";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
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
} from "react-native";

import { Logo, Title } from "../../assets/components/index";
import colors from "../../assets/styles/colors";
import styles from "../../assets/styles/style";

import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const router = useRouter();

  const { login } = useContext(AuthContext);

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      if (password === passwordConfirmation) {
        const response = await axios.post(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up`,
          {
            email: email,
            username: username,
            description: description,
            password: password,
          }
        );

        login(response.data.id, response.data.token);

        Alert.alert("Account created");
      } else {
        setErrorMessage("Passwords must be the same");
      }
    } catch (error) {
      if (error.response.data.error === "Missing parameter(s)") {
        setErrorMessage("Please fill all fields");
      } else if (
        error.response.data.error === "This email already has an account."
      ) {
        setErrorMessage("Email already exists");
      } else if (
        error.response.data.error === "This username already has an account."
      ) {
        setErrorMessage("Username already exists");
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
          <Title title="Sign up" />
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
          <TextInput
            style={[styles.oneLineInput]}
            placeholder="username"
            onChangeText={(text) => {
              setUsername(text);
            }}
            value={username}
          />
          <TextInput
            style={[styles.textAreaInput]}
            placeholder="Describe yourself in a few words..."
            onChangeText={(text) => {
              setDescription(text);
            }}
            value={description}
            multiline={true}
          />

          <View style={[styles.oneLineInput, styles.displayPasswordContainer]}>
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
              placeholder="confirm password"
              secureTextEntry={!showPasswordConfirmation}
              onChangeText={(text) => {
                setPasswordConfirmation(text);
              }}
              value={passwordConfirmation}
            />
            <TouchableOpacity
              activeOpacity={1}
              style={styles.displayPasswordIcon}
              onPress={() => {
                setShowPasswordConfirmation(!showPasswordConfirmation);
              }}
            >
              <FontAwesome
                name={showPasswordConfirmation ? "eye-slash" : "eye"}
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
          <TouchableOpacity
            style={[styles.btnStyle, isLoading && styles.disabledButton]}
            activeOpacity={0.8}
            onPress={() => {
              console.log("pressed !");
              handleSubmit();
            }}
            disabled={isLoading}
          >
            <Text style={styles.btnText}>
              {isLoading ? "Loading..." : "Sign up"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              router.navigate("/");
            }}
          >
            <Text style={styles.btnText}>Already have an account? Sign in</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
