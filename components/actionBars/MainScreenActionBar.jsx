import { View, Text } from "react-native";
import React from "react";
import { Appbar } from "react-native-paper";

export default function MainScreenActionBar({ navigation }) {
  return (
    <Appbar.Header>
      <Appbar.Action icon="menu" onPress={navigation.openDrawer} />
      <Appbar.Content title="ChitChat" />
    </Appbar.Header>
  );
}
