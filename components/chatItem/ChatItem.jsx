import { StyleSheet, Text, View } from "react-native";
import { Divider, List, ActivityIndicator } from "react-native-paper";
import React, { useState } from "react";
import CustomImageAvatar from "../UI/CustomImageAvatar";
import CustomTextAvatar from "../UI/CustomTextAvatar";
import { useSelector, useDispatch } from "react-redux";
import { useFetching } from "../../hooks/useFetching";
import User from "../../API/User";
import Chat from "../../API/Chat";
import Message from "../../API/Message";
import colorGenerator from "../../staf/colorGenerator";
import { useEffect } from "react";

export default function ChatItem({ chat, navigation }) {
  const { user } = useSelector((state) => state.auth);
  const { socket, lastMessage } = useSelector((state) => state.chat);
  const userModel = new User();
  const messageModel = new Message();
  const ucFirst = (str) => (str ? str[0].toUpperCase() + str.slice(1) : "");
  const [contact, setContact] = useState({});
  const [title, setTitle] = useState(chat.title);
  // const [lastMessage, setLastMessage] = useState("");
  const dispatch = useDispatch();
  const [contactFetch, contactIsFetching, contactError] = useFetching(
    async () => {
      let receiverId = chat.members.find((m) => m !== user._id);
      let contact = await userModel.getUserById(receiverId);
      let title = `${ucFirst(contact.name)} ${ucFirst(contact.lastName)}`;
      setContact(contact);
      setTitle(title);
    }
  );
  const [messageFetch, isMessageFetching, messageError] = useFetching(
    async () => {
      let res = await messageModel.getLast(chat._id);
      let message = res.messages[0];
      dispatch({ type: "chat/setLastMessage", payload: message });
    }
  );

  // on mount
  useEffect(() => {
    if (chat.type === "private") {
      contactFetch();
    }
    // messageFetch();

    // socket listeniers
    // socket.current.on("getMessage", (data) => {
    //   if (chat._id === data.chatId)
    //     dispatch({
    //       type: "chat/setLastMessage",
    //       payload: {
    //         sender: data.senderId,
    //         text: data.text,
    //         chatId: data.chatId,
    //         createdAt: Date.now(),
    //       },
    //     });
    // });
  }, []);

  // useEffect(() => {
  //   if (lastMessage) console.log(lastMessage);
  // }, [lastMessage]);

  return (
    <>
      {
        <List.Item
          onPress={() =>
            navigation.navigate("privateChat", {
              chat: chat,
              contact: contact,
              chatTitle: title,
            })
          }
          title={title}
          description={""}
          descriptionNumberOfLines={1}
          titleStyle={styles.itemTitle}
          left={() =>
            chat.picture ? (
              <CustomImageAvatar source={chat.picture} size={48} />
            ) : title ? (
              <CustomTextAvatar
                fullName={title}
                size={48}
                style={{ backgroundColor: colorGenerator(chat._id) }}
              />
            ) : (
              <ActivityIndicator animating={true} size={"large"} />
            )
          }
        />
      }

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
