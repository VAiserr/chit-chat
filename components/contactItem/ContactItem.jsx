import { StyleSheet, Text, View } from "react-native";
import { Divider, List, ActivityIndicator } from "react-native-paper";
import React from "react";
import CustomImageAvatar from "../UI/CustomImageAvatar";
import CustomTextAvatar from "../UI/CustomTextAvatar";
import { useState } from "react";
import { useEffect } from "react";
import { useFetching } from "../../hooks/useFetching";
import User from "../../API/User";
import colorGenerator from "../../staf/colorGenerator";

export default function ContactItem({ userId, onPress }) {
  const userModel = new User();
  const [picture, setPicture] = useState(false);
  const [user, setUser] = useState({});

  const [contactFetch, isFetching, error] = useFetching(async () => {
    const data = await userModel.getUserById(userId);
    setUser(data);
  });

  useEffect(() => {
    contactFetch();
  }, []);

  return (
    <>
      {!error ? (
        <List.Item
          onPress={() => onPress(user)}
          title={user.name ? `${user.name} ${user?.lastName}` : ""}
          description={""}
          descriptionNumberOfLines={1}
          titleStyle={styles.itemTitle}
          left={() =>
            user.name ? (
              user.picture ? (
                <CustomImageAvatar source={user.picture} size={48} />
              ) : (
                <CustomTextAvatar
                  fullName={`${user.name} ${user?.lastName}`}
                  size={48}
                  style={{ backgroundColor: colorGenerator(user._id) }}
                />
              )
            ) : (
              <ActivityIndicator animating={true} size={"large"} />
            )
          }
        />
      ) : (
        ""
      )}

      <Divider />
    </>
  );
}

const styles = StyleSheet.create({
  itemTitle: {
    marginRight: 10,
    fontSize: 18,
  },
});
