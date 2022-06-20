import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar, useTheme } from "react-native-paper";

export default function CustomTextAvatar({
  label,
  fullName,
  bgColor,
  ...props
}) {
  const { colors } = useTheme();
  if (label === undefined) {
    if (fullName === undefined) {
      label = "";
    } else {
      label = fullName
        .trim()
        .split(" ")
        .map((e) => e[0].toUpperCase())
        .join("");
    }
  }
  return (
    <Avatar.Text
      label={label}
      style={{ backgroundColor: bgColor || colors.primary }}
      {...props}
    />
  );
}

const styles = StyleSheet.create({});
