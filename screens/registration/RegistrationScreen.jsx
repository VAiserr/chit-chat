import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetching } from "../../hooks/useFetching";
import {
  ActivityIndicator,
  Button,
  TextInput,
  Title,
  useTheme,
} from "react-native-paper";
import PhoneNumInput from "../../components/UI/PhoneNumInput";
import useInput from "../../hooks/useInput";
import PasswordInput from "../../components/UI/PasswordInput";
import useValidation from "../../hooks/useValidation";
import { HelperText } from "react-native-paper";
import User from "../../API/User";
import { CommonActions } from "@react-navigation/native";
// import { KeyboardAvoidingView } from "react-native-web";

const RegistrationScreen = ({ navigation }) => {
  const { fonts, colors } = useTheme();
  const [phoneValue, setPhone] = useState("7 ");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [newUser, setNewUser] = useState({});
  const userModel = new User();

  const [passwordValidator, passwordError] = useValidation(() => {
    const err = [];
    if (!password.length) err.push({ message: "Поле Пароль обязательное" });
    else if (password.length < 6)
      err.push({ message: "Пароль должен содержать минимум 6 символов" });

    return err;
  }, password);

  const [phoneAvailable, setAvailable] = useState(false);

  const [phoneValidator, phoneErrors, setPhoneErrors] = useValidation(
    async () => {
      const errs = [];
      if (phoneValue.length < 11)
        errs.push({ message: "Поле Номер телефона обязательное" });
      if (phoneValue.length >= 11) phoneFetch();

      return errs;
    },
    phoneValue
  );
  const [phoneFetch, phoneIsFetchin, phoneFetchErr] = useFetching(
    async () => {
      const data = await userModel.getPhone(phoneValue);
      console.log(data);
      if (data) {
        setPhoneErrors((prevState) => [
          ...prevState,
          {
            message: "номер уже используется",
          },
        ]);
      }
    },
    () => {
      setAvailable(true);
    }
  );
  const [nameValidator, nameErrors] = useValidation(() => {
    const errs = [];
    if (!name.length) errs.push({ message: "Поле Имя обязательное" });
    else if (name.match(/[^\wаА-яЯёЁ]|\d/g))
      errs.push({ message: "Только латиница или кириллица" });

    return errs;
  }, name);
  const [lastNameValidator, lastNameErrors] = useValidation(() => {
    const errs = [];
    if (lastName.length >= 1 && lastName.match(/[^\wаА-яЯёЁ]|\d/g))
      errs.push({ message: "Только латиница или кириллица" });

    return errs;
  }, lastName);

  const dispatch = useDispatch();

  const [regFetching, isFetching, error] = useFetching(async () => {
    console.log("regFetching");
    const user = await userModel.register(newUser);
    await userModel.setData(user);

    dispatch({ type: "auth/startFetching" });
    dispatch({
      type: "auth/setUser",
      payload: user,
    });
    console.log("regFetchingEnd");
  });

  useEffect(() => {
    // console.log(phoneValue);
    if (phoneValue.length >= 11) phoneValidator.onBlur();
    else {
      phoneValidator.onFocus();
      setAvailable(false);
    }
  }, [phoneValue]);

  const buttonhandler = () => {
    phoneValidator.onBlur();
    if (
      passwordError?.length ||
      phoneErrors?.length ||
      nameErrors?.length ||
      lastNameErrors?.length ||
      !phoneAvailable
    )
      return console.log("Неа");

    const user = {
      name: name,
      lastName: lastName || "",
      phone: phoneValue,
      password: password,
    };
    console.log("click");
    setNewUser(user);
    // console.log(navigation.getState());
  };
  useEffect(() => {
    // console.log(!newUser.name);
    if (newUser.name) regFetching();
  }, [newUser]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.loginForm}>
          {phoneErrors.map((err, index) => (
            <HelperText
              key={index}
              type="error"
            >{`* ${err.message}`}</HelperText>
          ))}
          <PhoneNumInput
            {...phoneValidator}
            style={styles.input}
            value={phoneValue}
            onChangeText={setPhone}
            loading={phoneIsFetchin}
          />

          {nameErrors.map((err, index) => (
            <HelperText
              key={index}
              type="error"
            >{`* ${err.message}`}</HelperText>
          ))}
          <TextInput
            {...nameValidator}
            style={styles.input}
            label="Имя"
            mode="outlined"
            value={name}
            onChangeText={(val) => setName(val)}
          />

          {lastNameErrors.map((err, index) => (
            <HelperText
              key={index}
              type="error"
            >{`* ${err.message}`}</HelperText>
          ))}
          <TextInput
            {...lastNameValidator}
            style={styles.input}
            label="Фамилия"
            placeholder="(не обязательное)"
            mode="outlined"
            value={lastName}
            onChangeText={(val) => setLastName(val)}
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

          <HelperText visible={error} type="error" hidden={!error}>
            {error}
          </HelperText>
          <Button
            mode="contained"
            style={styles.button}
            onPress={buttonhandler}
            loading={isFetching}
          >
            {isFetching ? "" : "Регистрация"}
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginForm: {
    paddingBottom: 50,
    maxWidth: 300,
  },
  input: {
    width: 300,
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  scrollContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
