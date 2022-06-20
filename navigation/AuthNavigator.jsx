import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "react-native-paper";
import Greeting from "../screens/greeting/Greeting";
import { authScreens } from "../screens";

// const Stack = createStackNavigator();

export default function AuthNavigator({ AuthStack }) {
  useEffect(() => {
    console.log("nen");
  }, []);

  const { colors } = useTheme();
  return (
    <AuthStack.Group
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
        headerTintColor: colors.text,
      }}
    >
      {authScreens.map((screen) => (
        <AuthStack.Screen {...screen} />
      ))}
      {/* <Stack.Screen name="greeting" component={Greeting} /> */}
    </AuthStack.Group>
  );
}
