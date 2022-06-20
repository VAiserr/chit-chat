import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "./MainNavigator";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../screens/loading/LoadingScreen";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import AppStyles from "../config/styles";
import { useFetching } from "../hooks/useFetching";
import User from "../API/User";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigator from "./AuthNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { authScreens, messengerScreens } from "../screens";
import { useTheme } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import MainScreen from "../screens/main/MainScreen";

// const Stack = createNativeStackNavigator();
const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

export default function Navigation() {
  const userModel = new User();
  const { user, isLoading, isError, error } = useSelector(
    (state) => state.auth
  );
  const { colors } = useTheme();

  const globalScreenOptions = {
    headerTintColot: colors.text,
  };
  const dispatch = useDispatch();
  const [fetchUser, userFetching, userError] = useFetching(
    async () => {
      const data = await userModel.getData();
      // console.log(data);
      let user = {};
      if (data) user = await userModel.getUserById(data._id);
      data.contacts = user.contacts;
      dispatch({
        type: "auth/setUser",
        payload: data,
      });
    },
    async () => {
      await userModel.logOut();
      dispatch({
        type: "auth/setUser",
        payload: null,
      });
    }
  );

  // const {fonts} = AppStyles;
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
    "Roboto-Thin": require("../assets/fonts/Roboto-Thin.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Black": require("../assets/fonts/Roboto-Black.ttf"),
  });

  useEffect(() => {
    fetchUser();

    // console.log(isLoading);
  }, []);

  useEffect(() => {
    // console.log(user);
  }, [user]);

  if (!fontsLoaded || isLoading) {
    return <AppLoading />;
  }

  return (
    // <MainScreen />
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: "horizontal",
          headerTintColor: colors.text,
        }}
      >
        {/* <Stack.Screen name="main" component={MainScreen} /> */}

        {/* <AuthNavigator /> */}
        {/* <MainNavigator /> */}
        {user ? (
          <Stack.Group>
            {messengerScreens.map((screen) => (
              <Stack.Screen {...screen} />
            ))}
          </Stack.Group>
        ) : (
          <Stack.Group>
            {authScreens.map((screen) => (
              <Stack.Screen {...screen} />
            ))}
            {/* <Stack.Screen name="greeting" component={Greeting} /> */}
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
