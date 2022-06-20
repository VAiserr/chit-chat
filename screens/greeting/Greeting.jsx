import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Title, useTheme } from "react-native-paper";
import { StatusBar } from "expo-status-bar";

const Greeting = ({ navigation }) => {
  const { colors, fonts } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary,
    },
    blur: {
      width: "100%",
      height: "100%",
      backdropFilter: "brightness(60%)",
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      justifyContent: "center",
      alignItems: "center",
    },
    buttonGroup: {
      marginTop: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      width: 250,
    },
    titleText: {},
  });

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} />
      <View style={styles.blur}>
        <View>
          <Text style={{ fontFamily: "Roboto-Black", fontSize: 50 }}>
            ChitChat
          </Text>
        </View>
        <View style={styles.buttonGroup}>
          <Button
            mode="contained"
            onPress={() => {
              navigation.navigate("login");
            }}
          >
            Войти
          </Button>
          <Button
            mode="outlined"
            style={{ backgroundColor: colors.surface }}
            onPress={() => {
              navigation.navigate("registration");
            }}
          >
            Регистрация
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Greeting;
