import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Animated,
  PanResponder,
} from "react-native";
import Input from "./ManagePhone/Input";
const PopupPin = ({ isVisible, onClose, title, navigation }) => {
  function submitHandler(entered) {
    if (entered.length === 6 && entered === "251204") {
      onClose();
    } else {
      // Người dùng nhập sai mã pin, thực hiện hiệu ứng rung
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {title && <Text style={styles.title}>{title}</Text>}
          <Input
            label={"Nhập mã:"}
            textInputConfig={{
              maxLength: 6,
              placeholder: "******",
              keyboardType: "number-pad",
              secureTextEntry: true,
              onChangeText: (entered) => submitHandler(entered),
            }}
          />
          <TouchableOpacity
            style={{ alignItems: "center", marginTop: 10 }}
            onPress={() => navigation()}
          >
            <Text style={styles.textForget}>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 25,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  textForget: {
    color: "rgb(55 128 216)",
    fontWeight: "600",
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PopupPin;
