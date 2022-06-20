import Greeting from "./greeting/Greeting";
import LoginScreen from "./login/LoginScreen";
import MainScreen from "./main/MainScreen";
import RegistrationScreen from "./registration/RegistrationScreen";
import AuthActionBar from "../components/actionBars/AuthActionBar";
import MainDrawNavigator from "../navigation/MainDrawNavigator";
import MessengerDrawer from "../components/MessengerDrawer";
import PrivateChat from "./chats/PrivateChat";
import AddChatScreen from "./addChat/AddChatScreen";
import AddContactScreen from "./addContact/AddContactScreen";
import AddActionBar from "../components/actionBars/AddActionBar";

export const authScreens = [
  {
    name: "greeting",
    component: Greeting,
    options: {
      headerShown: false,
    },
    key: 0,
  },
  {
    name: "login",
    component: LoginScreen,
    options: {
      title: "Авторизация",
      header: (props) => <AuthActionBar {...props} title="Войти" />,
      headerShown: true,
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "#8a2be2",
      },
    },
    key: 1,
  },
  {
    name: "registration",
    component: RegistrationScreen,
    options: {
      title: "Регистрация",
      header: (props) => <AuthActionBar {...props} title="Регистрация" />,
      headerShown: true,
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "#8a2be2",
      },
    },
    key: 2,
  },
];

export const messengerScreens = [
  {
    name: "mainNavigator",
    component: MainDrawNavigator,
    options: {
      title: "Messenger",
      headerShown: false,
    },
    key: 0,
  },
  {
    name: "addChat",
    component: AddChatScreen,
    options: {
      title: "Новое сообщение",
      headerShown: true,
      header: (props) => <AuthActionBar {...props} title="Новое сообщение" />,
    },
    key: 1,
  },
  {
    name: "privateChat",
    component: PrivateChat,
    options: {
      title: "Messenger",
      header: (props) => <AuthActionBar {...props} title="ChitChat" />,
      headerShown: false,
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "#8a2be2",
      },
    },
    key: 2,
  },
  {
    name: "addContact",
    component: AddContactScreen,
    options: {
      title: "Новое сообщение",
      headerShown: false,
      header: (props) => <AddActionBar {...props} title="Добавить контакт" />,
    },
    key: 3,
  },
];
