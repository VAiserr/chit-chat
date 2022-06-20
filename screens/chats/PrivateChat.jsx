import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import ChatActionBar from "../../components/actionBars/ChatActionBar";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";
import { useFetching } from "../../hooks/useFetching";
import { useDispatch, useSelector } from "react-redux";
import { Appbar, TextInput, useTheme } from "react-native-paper";
import Chat from "../../API/Chat";
import Message from "../../API/Message";
import { ActivityIndicator } from "react-native-paper";

export default function PrivateChat({ navigation, route }) {
  const params = route.params;
  const chatModel = new Chat();
  const messageModel = new Message();
  const dispatch = useDispatch();
  const ucFirst = (str) => (str ? str[0].toUpperCase() + str.slice(1) : "");
  const { user } = useSelector((state) => state.auth);
  const { colors } = useTheme();
  const [messageValue, setMessageValue] = useState("");
  const [newMessage, setNewMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isNew, setIsNew] = useState(false);
  const [chat, setChat] = useState(null);
  const [fetchMessages, messagesIsFetching, messagesError] = useFetching(
    async () => {
      console.log(chat._id);
      const response = await messageModel.getAll(chat._id);
      setMessages(response.messages);
    }
  );
  const [chatFetching, isChatFetching, error] = useFetching(
    async () => {
      const chat = await chatModel.getPrivate([user._id, params.contact._id]);
      chat.title = `${ucFirst(params.contact.name)} ${ucFirst(
        params.contact?.lastName
      )}`;
      // console.log(chat);
      setChat(chat);
    },
    () => {
      let chat = {
        title: `${ucFirst(params.contact.name)} ${ucFirst(
          params.contact?.lastName
        )}`,
      };
      setChat(chat);
      setIsNew(true);
    }
  );
  const [sendMessage, sending, sendingError] = useFetching(async () => {
    const message = await messageModel.send(newMessage);
    // console.log(message);
    setMessages((prev) => [...prev, message]);
  });

  const createChat = async () => {
    const chat = await chatModel.createPrivateChat({
      senderId: user._id,
      receiverId: params.contact._id,
    });
    dispatch({ type: "chat/addChat", payload: chat });
    let { title, ...other } = chat;
    setChat((prev) => ({ ...prev, other }));
    setIsNew(false);
    return chat;
  };

  // On mount
  useEffect(() => {
    if (!params.chat?._id) {
      // console.log(params.userId);

      chatFetching();
    }
    // console.log(params.contact);
    else if (params.chat) {
      setChat({ ...params.chat, title: params.chatTitle });
    }
  }, []);

  useEffect(() => {
    if (chat?._id) fetchMessages();
  }, [chat]);

  useEffect(() => {
    // console.log(error);
  }, [error]);

  const handleSubmit = async () => {
    let message = {};
    if (isNew) {
      let chat = await createChat();
      message = {
        chatId: chat._id,
        sender: user._id,
        text: messageValue.trim(),
      };
    }
    // console.log(chat._id);
    else
      message = {
        chatId: chat._id,
        sender: user._id,
        text: messageValue.trim(),
      };
    // console.log(message);
    setNewMessage(message);
    setMessageValue("");
  };

  useEffect(() => {
    if (newMessage) {
      sendMessage(newMessage);
      setNewMessage("");
    }
  }, [newMessage]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    chatContainer: {
      flex: 1,
      backgroundColor: "#ebdefa",
      // #ebdefa
      // #f1f2f3
    },

    footer: {},
    inpute: {
      // borderRadius: 20,
      backgroundColor: "#f1f2f3",
    },
    messagesList: {
      // flex: 1,
      flexDirection: "column-reverse",
    },
    sender: {
      backgroundColor: colors.light,
      alignSelf: "flex-end",
      padding: 10,
      marginHorizontal: 10,
      marginVertical: 5,
      marginLeft: 80,
      borderRadius: 30,
      borderBottomRightRadius: 5,
    },
    reciever: {
      backgroundColor: colors.surface,
      alignSelf: "flex-start",
      padding: 10,
      marginHorizontal: 10,
      marginVertical: 5,
      borderRadius: 30,
      borderBottomLeftRadius: 5,
    },
    senderText: {
      color: "white",
    },
  });

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title={chat ? chat.title : ""} />
        <Appbar.Action icon={"dots-vertical"} />
      </Appbar.Header>
      <KeyboardAvoidingView style={styles.chatContainer}>
        <>
          <ScrollView style={styles.messagesList}>
            {messages.map((message, index) => {
              if (message.sender === user._id)
                return (
                  <View style={styles.sender} key={index}>
                    <Text style={styles.senderText}>{message.text}</Text>
                  </View>
                );
              else
                return (
                  <View style={styles.reciever} key={index}>
                    <Text>{message.text}</Text>
                  </View>
                );
            })}
          </ScrollView>
          <View style={styles.footer}>
            <TextInput
              style={styles.inpute}
              placeholder="Сообщение"
              value={messageValue}
              onChangeText={(val) => setMessageValue(val)}
              right={
                sending ? (
                  <ActivityIndicator size={"large"} />
                ) : (
                  <TextInput.Icon name="send" onPress={handleSubmit} />
                )
              }
            />
          </View>
        </>
      </KeyboardAvoidingView>
    </View>
  );
}
