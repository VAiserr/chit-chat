import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "react-native-paper";
import { createDrawerNavigator, DrawerContent } from "@react-navigation/drawer";
import MainScreen from "../screens/main/MainScreen";
import AuthActionBar from "../components/actionBars/AuthActionBar";
import MessengerDrawer from "../components/MessengerDrawer";
import MainScreenActionBar from "../components/actionBars/MainScreenActionBar";

const Drawer = createDrawerNavigator();
export default function MainDrawNavigator({}) {
  const { colors } = useTheme();
  return (
    <Drawer.Navigator
      drawerContent={MessengerDrawer}
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
        headerTintColor: colors.text,
        swipeEdgeWidth: 1000,
      }}
    >
      <Drawer.Screen
        name="main"
        component={MainScreen}
        options={{ header: MainScreenActionBar }}
      />
    </Drawer.Navigator>
  );
}
