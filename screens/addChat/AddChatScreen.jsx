import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FAB, List, useTheme } from "react-native-paper";
import ContactItem from "../../components/contactItem/ContactItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import User from "../../API/User";
import { useState } from "react";
import { useFetching } from "../../hooks/useFetching";

export default function AddChatScreen({ navigation }) {
  const userModel = new User();
  const { user } = useSelector((state) => state.auth);
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    fab: {
      position: "absolute",
      bottom: 0,
      right: 0,
      margin: 16,
      backgroundColor: colors.primary,
    },
    container: {
      flex: 1,
    },
  });

  return (
    <View style={styles.container}>
      <List.Section>
        <List.Subheader>Список контактов</List.Subheader>
        {user.contacts.length ? (
          user.contacts.map((contact, index) => (
            <ContactItem
              key={index}
              userId={contact}
              onPress={(data) =>
                navigation.replace("privateChat", {
                  contact: data,
                })
              }
            />
          ))
        ) : (
          <Text
            style={{
              fontFamily: "Roboto-Bold",
              textAlign: "center",
              fontSize: 24,
            }}
          >
            Здесь пока пусто
          </Text>
        )}
      </List.Section>
      <FAB
        icon={"account-plus"}
        style={styles.fab}
        onPress={() => navigation.navigate("addContact")}
      />
    </View>
  );
}
