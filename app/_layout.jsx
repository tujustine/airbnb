import { Stack, router } from "expo-router";
import { AuthContext } from "../context/AuthContext";
import { useState, useEffect } from "react";

export default function RootLayout() {
  const [userID, setUserID] = useState(null);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    if (userID && userToken) {
      router.replace("/home");
    } else {
      router.replace("/");
    }
  }, [userID, userToken]);

  const login = (userID, userToken) => {
    setUserID(userID);
    setUserToken(userToken);
  };
  const logout = () => {
    setUserID(null);
    setUserToken(null);
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
