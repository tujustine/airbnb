import { Stack, router } from "expo-router";
import { AuthContext } from "../context/AuthContext";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
  const [userID, setUserID] = useState(null);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setUserID(await AsyncStorage.getItem("id"));
      setUserToken(await AsyncStorage.getItem("token"));
    };

    fetchData();

    if (userID && userToken) {
      router.replace("/home");
    } else {
      router.replace("/");
    }
  }, [userID, userToken]);

  const login = async (userID, userToken) => {
    setUserID(userID);
    setUserToken(userToken);
    await AsyncStorage.setItem("id", userID);
    await AsyncStorage.setItem("token", userToken);
    console.log(await AsyncStorage.getItem("id"));
  };
  const logout = async () => {
    setUserID(null);
    setUserToken(null);
    await AsyncStorage.removeItem("id");
    await AsyncStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        login: login,
        logout: logout,
        userID: userID,
        userToken: userToken,
      }}
    >
      <Stack>
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(app)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </AuthContext.Provider>
  );
}
