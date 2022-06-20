import { View, ViewBase, StyleSheet } from "react-native";
import React from "react";
import {
  Appbar,
  Avatar,
  Drawer,
  useTheme,
  Text,
  Headline,
  Subheading,
  Caption,
  Button,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import User from "../API/User";
import { useFetching } from "../hooks/useFetching";

export default function MessengerDrawer() {
  const userModel = new User();
  const { user } = useSelector((state) => state.auth);
  const { colors } = useTheme();
  const initials =
    user.name[0].toUpperCase() + (user.lastName[0]?.toUpperCase() || "");
  const ucFirst = (str) => (str ? str[0].toUpperCase() + str.slice(1) : "");
  const phoneMask = (str) =>
    `+${str[0]} (${str.slice(1, 4)}) ${str.slice(4, 7)}-${str.slice(
      7,
      9
    )}-${str.slice(9, 11)}`;

  const dispatch = useDispatch();

  const [logOutFetch, isFetching, error] = useFetching(async () => {
    await userModel.logOut();

    dispatch({ type: "auth/startFetching", payload: null });
    dispatch({ type: "auth/setUser", payload: null });
  });

  const styles = StyleSheet.create({
    drawerWrapper: {
      flex: 1,
    },
    drawerHeader: {
      paddingVertical: 10,
      paddingLeft: 15,
      height: 156,
      alignItems: "flex-end",
    },
    drawerContent: {
      justifyContent: "flex-start",
    },
    drawerUserInfo: {
      marginTop: 10,
    },
    drawerFooter: {
      marginTop: "auto",
      paddingVertical: 30,
      flexDirection: "row",
      justifyContent: "center",
    },
    button: {
      width: 200,
    },
  });
  return (
    <View style={styles.drawerWrapper}>
      <Appbar style={styles.drawerHeader}>
        <View style={styles.drawerContent}>
          {user?.profilePicture ? (
            <Avatar.Image size={64} />
          ) : (
            <Avatar.Text
              label={initials}
              style={{ backgroundColor: colors.dark }}
              size={64}
            />
          )}

          <View style={styles.drawerUserInfo}>
            <Text style={{ color: colors.background }}>{`${ucFirst(
              user?.name
            )} ${ucFirst(user?.lastName)}`}</Text>
            <Text style={{ color: colors.background }}>
              {phoneMask(user?.phone)}
            </Text>
          </View>
        </View>
      </Appbar>
      <Drawer.Section title="чаты">
        <Drawer.Item label="Все" active={true} />
      </Drawer.Section>
      <Drawer.Section>
        <Drawer.Item label="Контакты" icon={"contacts"} />
        <Drawer.Item label="Настройки" icon="account-edit" />
      </Drawer.Section>
      <View style={styles.drawerFooter}>
        <Button
          style={styles.button}
          mode="outlined"
          onPress={logOutFetch}
          loading={isFetching}
        >
          {isFetching ? "" : "Выход"}
        </Button>
      </View>
    </View>
  );
}
