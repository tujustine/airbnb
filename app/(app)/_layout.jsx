import { Tabs } from "expo-router";

export default function AppLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="map"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(home)"
        options={{
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
