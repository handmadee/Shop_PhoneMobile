import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const NotiScreen = ({ iconImg, message, labelBtn, onPress }) => {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image style={{ width: 225, height: 225 }} source={iconImg} />
        <Text style={{ color: "#00bf15", fontWeight: "bold", fontSize: 20 }}>
          {message}
        </Text>
      </View>
      <TouchableOpacity onPress={onPress} style={styles.btnContainer}>
        <Text style={styles.labelBtn}>{labelBtn}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: "#2378de",
    width: "80%",
    padding: 15,
    borderRadius: 7,
    marginBottom: 25,
  },
  labelBtn: {
    color: "white",
    textAlign: "center",
    fontWeight: "500",
    fontSize: 16,
  },
});
export default NotiScreen;
