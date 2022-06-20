import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetching } from "../../hooks/useFetching";
import {
  Button,
  HelperText,
  TextInput,
  Title,
  useTheme,
} from "react-native-paper";
import PhoneNumInput from "../../components/UI/PhoneNumInput";
import useInput from "../../hooks/useInput";
import PasswordInput from "../../components/UI/PasswordInput";
import useValidation from "../../hooks/useValidation";
import User from "../../API/User";

const LoginScreen = () => {
  const userModel = new User();
  const [newUser, setNewUser] = useState({});
  const { fonts, colors } = useTheme();
  const [phoneValue, setPhone] = useState("7 ");
  const [password, setPassword] = useState("");
  const [apiError, setApiError] = useState("");
  const dispatch = useDispatch();

  const [passwordValidator, passwordError, setPassError] = useValidation(() => {
    const err = [];
    if (!password.length) err.push({ message: "Поле Пароль обязательное" });

    return err;
  }, password);
  const [phoneValidator, phoneErrors, setPhoneErrors] = useValidation(() => {
    const errs = [];
    if (phoneValue.length < 11)
      errs.push({ message: "Поле Номер телефона обязательное" });

    return errs;
  }, phoneValue);

  const [loginFetch, isFetching, error] = useFetching(
    async () => {
      console.log("logFetching");
      const user = await userModel.login(newUser);
      await userModel.setData(user);

      dispatch({ type: "auth/startFetching" });
      dispatch({
        type: "auth/setUser",
        payload: user,
      });
      console.log("logFetchingEnd");
    },
    (e) => {
      // console.log(e);
      if (e.type == "404")
        setPhoneErrors((prev) => [...prev, e.payload.message]);
      else if (e.type == "400")
        setPassError((prev) => [...prev, e.payload.message]);
      if (e) setApiError("Неверный номер телефона или пароль");
      // else
      //   Alert.alert("API error", e.message, [
      //     { text: "OK", onPress: () => console.log("OK Pressed") },
      //   ]);
    }
  );

  useEffect(() => {
    // console.log(phoneValue);
    phoneValidator.onFocus();
    setApiError("");
  }, [phoneValue]);

  useEffect(() => {
    // console.log(phoneValue);
    passwordValidator.onFocus();
    setApiError("");
  }, [password]);

  const login = async () => {
    await phoneValidator.onBlur();
    if (phoneErrors.length || passwordError.length) return console.log("Упс");

    const data = {
      phone: phoneValue,
      password: password,
    };
    console.log(data);
    setNewUser(data);
  };

  useEffect(() => {
    if (newUser.phone) loginFetch();
  }, [newUser]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.loginForm}>
        {phoneErrors.map((err, index) => (
          <HelperText key={index} type="error">{`* ${err.message}`}</HelperText>
        ))}
        <PhoneNumInput
          {...phoneValidator}
          style={styles.input}
          value={phoneValue}
          onChangeText={setPhone}
        />
        {passwordError?.map((err, index) => (
          <HelperText key={index} type="error" visible={true}>
            {`* ${err.message}`}
          </HelperText>
        ))}
        <PasswordInput
          {...passwordValidator}
          value={password}
          onChangeText={(val) => setPassword(val)}
          style={styles.input}
        />

        {apiError ? (
          <HelperText type="error" visible={true}>
            {`* ${apiError}`}
          </HelperText>
        ) : (
          <Text></Text>
        )}
        <Button
          mode="contained"
          style={styles.button}
          onPress={login}
          loading={isFetching}
        >
          {isFetching ? "" : "Войти"}
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginForm: {
    paddingBottom: 100,
    maxWidth: 300,
  },
  input: {
    width: 300,
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});
