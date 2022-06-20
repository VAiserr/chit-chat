import { View, Text } from "react-native";
import React from "react";
import MaskInput from "react-native-mask-input";
import { TextInput } from "react-native-paper";
import { useState } from "react";
import { useEffect } from "react";

export default function PhoneNumInput(props) {
  const [phone, setPhone] = useState("7 ");
  const mask = [
    "(",
    "+",
    /\d/,
    ")",
    "   ",
    /\d/,
    /\d/,
    /\d/,
    " ",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
  ];

  useEffect(() => {}, [phone]);
  return (
    <TextInput
      {...props}
      label="Номер телефона"
      mode="outlined"
      autoComplete="tel-device"
      keyboardType="phone-pad"
      autoFocus
      type="tel"
      render={(props) => (
        <MaskInput
          {...props}
          onChangeText={(masked, unmasked) => {
            props.onChangeText(unmasked);

            // console.log(masked);
            // console.log(unmasked);
          }}
          mask={mask}
        />
      )}
    />
  );
}
