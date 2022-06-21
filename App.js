import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./navigation";
import { configureStore } from "@reduxjs/toolkit";
import { Provider as StoreProvider } from "react-redux";
import {
  configureFonts,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import reducer from "./reducers";
import fontConfig from "./config/fontConfig";
import logger from "redux-logger";

/**
 * Хранит в себе Redux состояния.
 *
 * Получить состояние можно с помощью хука useSelector(), например:
 *  const userState = useSelector((state) => state.auth.user);
 *
 * Изменить состояние можно вызвав нужный action при помощи хука useDispatch(), например:
 *  const dispatch = useDispatch();
 *  dispatch({
 *    type: "auth/setUser",
 *    payload: data,
 *  });
 *
 */
const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["chat/setSocket"],
        // Ignore these field paths in all actions
        ignoredActionPaths: [],
        // Ignore these paths in the state
        ignoredPaths: ["chat.socket"],
      },
    }),
});

/**
 * Тема приложения
 *
 * Для доступа к теме в пользовательском компоненте используется хук useTheme(), например:
 *  const {colors} = useTheme();
 */
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    light: "#9e47ff",
    dark: "#0400ba",
  },
  fonts: configureFonts(fontConfig),
};

export default function App() {
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <Navigation />
      </PaperProvider>
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
