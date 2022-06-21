import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FAB, List, useTheme } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import CustomListItem from "../../components/customListItem/CustomListItem";
import ChatItem from "../../components/chatItem/ChatItem";
import { useFetching } from "../../hooks/useFetching";
import Chat from "../../API/Chat";
import { useSelector, useDispatch } from "react-redux";
import User from "../../API/User";
navigator.__defineGetter__("userAgent", function () {
  // you have to import rect native first !!
  return "react-native";
});
import { io } from "socket.io-client";
import { useRef } from "react";

const MainScreen = ({ navigation }) => {
  const chatModel = new Chat();
  const userModel = new User();
  const { colors } = useTheme();
  const { user } = useSelector((state) => state.auth);
  const { chats } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  // const [chats, setChats] = useState([]);
  const [chatsFetch, isFetching, error] = useFetching(async () => {
    let data = await chatModel.getAll(user._id);

    if (data) {
      // data = data.map((elem) => {
      //   if (elem.type === "private") {
      //     let sender = {};
      //     let receiver = {};
      //     elem.members.forEach((member) => {
      //       if (member === user._id) sender = { _id: member };
      //       else {
      //         receiver = { _id: member };
      //       }
      //     });
      //     return { ...elem, sender, receiver };
      //   }
      // });
      // console.log(data);
      // setChats(data);
      dispatch({ type: "chat/setChats", payload: data });
    }
  });

  // create private chat
  const createPrivate = async (members) => {
    try {
      let res = await chatModel.createPrivateChat(members);
      setChats((prev) => [...prev, chat]);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  // socket io
  const socket = useRef();

  useEffect(() => {
    socket.current = io("http://185.20.226.53:8900", {
      transports: ["websocket"], // you need to explicitly tell it to use websockets
    });

    dispatch({ type: "chat/setSocket", payload: socket });
    chatsFetch();
    // socket listeniers
    socket.current.on("addChat", (chat) => {
      dispatch({ type: "chat/addChat", payload: chat });
    });
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
  }, [user]);

  useEffect(() => {
    console.log(chats);
  }, [chats]);

  useEffect(() => {
    console.log(user.contacts);
    userModel.setData(user);
  }, [user.contacts]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    buttContainer: {},
    fab: {
      position: "absolute",
      bottom: 0,
      right: 0,
      margin: 16,
      backgroundColor: colors.primary,
    },
  });

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <List.Section>
            {chats.length ? (
              chats.map((chat, index) => (
                <ChatItem chat={chat} key={index} navigation={navigation} />
              ))
            ) : (
              // <Text>чаты</Text>
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
        </ScrollView>
        <StatusBar style="light" />
        <FAB
          icon={"plus"}
          style={styles.fab}
          onPress={() => navigation.navigate("addChat")}
        />
      </View>
    </>
  );
};

export default MainScreen;
