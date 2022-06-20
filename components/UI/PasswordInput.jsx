import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";

export default function PasswordInput(props) {
  return (
    <TextInput
      {...props}
      label="Пароль"
      mode="outlined"
      secureTextEntry
      type="password"
    />
  );
}

const styles = StyleSheet.create({});
