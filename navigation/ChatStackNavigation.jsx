import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { authScreens, chatScreens } from "../screens";
import { useTheme } from "react-native-paper";

const Stack = createStackNavigator();

export default function ChatStackNavigation({}) {
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
        headerTintColor: colors.text,
      }}
    >
      {chatScreens.map((screen) => {
        <Stack.Screen {...screen} />;
      })}
    </Stack.Navigator>
  );
}
