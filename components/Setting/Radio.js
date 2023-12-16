import { View, Text } from "react-native";
import React from "react";
import { RadioButton } from "react-native-paper";

const RadioCustom = ({ label, value, selectedValue, onChange }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <RadioButton
        color="rgb(55 128 216)"
        value={value}
        status={selectedValue === value ? "checked" : "unchecked"}
        onPress={() => onChange(value)}
      />
      <Text style={{ fontSize: 16 }}>{label}</Text>
    </View>
  );
};

export default RadioCustom;
