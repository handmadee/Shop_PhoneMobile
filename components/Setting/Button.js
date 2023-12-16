import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

const ButtonCustom = ({ children, onPress, mode, style }) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    backgroundColor: "rgb(55 128 216)",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  flat: {
    backgroundColor: "transparent",
    borderWidth: 1.35,
    borderColor: "rgb(234 88 12)",
    borderRadius: 10,
  },
  flatText: {
    color: "rgb(234 88 12)",
    fontSize: 18,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: "#ddd",
    borderRadius: 15,
  },
});
export default ButtonCustom;
