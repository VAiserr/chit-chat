import { StyleSheet, Text, View } from "react-native";
import React from "react";
import styles from "./style";
import { Button, useTheme } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useFetching } from "../../hooks/useFetching";
import User from "../../API/User";

const LoadingScreen = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [logOutFetch, isLogOuting, error] = useFetching(async () => {
    const userModel = new User();
    await userModel.logOut();
    dispatch({ type: "auth/setUser", payload: null });
  });

  const logOut = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.blur}>
        <View>
          <Text style={{ color: colors.primary }}>ChitChat</Text>
          <Button mode="contained" onPress={logOutFetch} loading={isLogOuting}>
            Выход
          </Button>
        </View>
      </View>
    </View>
  );
};

export default LoadingScreen;
