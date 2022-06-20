import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import React from "react";
import PhoneNumInput from "../../components/UI/PhoneNumInput";
import { useState } from "react";
import AddActionBar from "../../components/actionBars/AddActionBar";
import { Button, HelperText } from "react-native-paper";
import useValidation from "../../hooks/useValidation";
import { useFetching } from "../../hooks/useFetching";
import { useDispatch, useSelector } from "react-redux";
import User from "../../API/User";
import { useEffect } from "react";

export default function AddContactScreen({ navigation }) {
  const userModel = new User();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [phoneValue, setPhoneValue] = useState("7 ");
  const [ready, setReady] = useState(false);
  // const [isFetching, setFetching] = useState(false);
  const [
    phoneValidator,
    phoneErrors,
    setPhoneErrors,
    phoneIsInputing,
    setInputing,
  ] = useValidation(() => {
    const errs = [];
    if (phoneValue.length < 11)
      errs.push({ message: "Поле Номер телефона обязательное" });

    return errs;
  }, phoneValue);

  const [addContact, isFetching, error] = useFetching(
    async () => {
      const contact = await userModel.getByPhone(phoneValue);
      const { _id, ...other } = contact;
      if (user._id === _id)
        return setPhoneErrors([{ message: "Вы не можете добавить сами себя" }]);
      if (user.contacts.includes(_id))
        return setPhoneErrors([{ message: "Пользователь уже был добавлен" }]);
      await dispatch({ type: "auth/addContact", payload: _id });
      // console.log(user.contacts);
      userModel.update({ userId: user._id, contacts: [...user.contacts, _id] });
      // console.log(`id: ${_id}`);
      navigation.goBack();
    },
    () => {
      setPhoneErrors([{ message: "Пользователь не найден" }]);
    }
  );

  useEffect(() => {
    // console.log(user.contacts);
  }, [user.contacts]);

  useEffect(() => {
    if (ready) {
      if ((!phoneIsInputing, !phoneErrors.length)) addContact();
      setReady(false);
    }
  }, [ready]);

  useEffect(() => {
    setInputing(true);
  }, [phoneValue]);

  const handleClick = () => {
    setInputing(false);
    setReady(true);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    avoidingContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    inputBlock: {
      position: "absolute",
      top: 150,
    },
    input: {
      width: 300,
    },
    button: {
      marginTop: 10,
    },
  });

  return (
    <View style={styles.container}>
      <AddActionBar
        navigation={navigation}
        title="Добавить контакт"
        onSubmit={handleClick}
      />
      <KeyboardAvoidingView style={styles.avoidingContainer}>
        <View style={styles.inputBlock}>
          {phoneErrors.map((err, index) => (
            <HelperText
              key={index}
              type="error"
            >{`* ${err.message}`}</HelperText>
          ))}
          <PhoneNumInput
            {...phoneValidator}
            value={phoneValue}
            onChangeText={(val) => setPhoneValue(val)}
            style={styles.input}
          />
          <Button
            mode="contained"
            style={styles.button}
            onPress={handleClick}
            loading={isFetching}
          >
            {isFetching ? "" : "Добавить"}
          </Button>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
