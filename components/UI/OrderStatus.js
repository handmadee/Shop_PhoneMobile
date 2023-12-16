import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import CircleStatus from "./Status/CircleStatus";

const OrderStatus = () => {
  const status = [
    {
      icon: "cart-outline",
      label: "Đặt hàng",
      dots: "...........",
      type: 1,
    },
    {
      icon: "man-outline",
      label: "Thông tin đặt hàng",
      dots: "...........",
      type: 2,
    },
    {
      icon: "card-outline",
      label: "Thanh toán",
      dots: "...........",
      type: 3,
    },
    {
      icon: "chevron-down-circle-outline",
      label: "Hoàn tất đặt hàng",
      dots: "",
      type: 4,
    },
  ];

  return (
    <View style={styles.container}>
      {status.map((item) => {
        return (
          <CircleStatus
            key={item.type}
            icon={item.icon}
            label={item.label}
            dots={item.dots}
          />
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    backgroundColor: "#c8daf0",
    height: 70,
    width: "100%",
    padding: 10,
    flexDirection: "row",
  },
});
export default OrderStatus;
