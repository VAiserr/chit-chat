import React, { useEffect } from "react";
import Greeting from "../screens/greeting/Greeting";
import { createStackNavigator } from "@react-navigation/stack";
import { messengerScreens } from "../screens";
import { useTheme } from "react-native-paper";
import { createDrawerNavigator } from "@react-navigation/drawer";

// const Stack = createStackNavigator();
export function MainNavigator({ MainStack }) {
  const { colors } = useTheme();
  useEffect(() => {
    console.log(Stak);
  }, []);
  return (
    <MainStack.Group
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
        headerTintColor: colors.text,
      }}
    >
      {messengerScreens.map((screen, index) => (
        <MainStack.Screen {...screen} key={index} />
      ))}
    </MainStack.Group>
  );
}
