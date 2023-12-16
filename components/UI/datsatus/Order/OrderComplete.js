import { View, Text, Dimensions, StyleSheet } from "react-native";
import React from "react";
import Field from "../../../InforUser/Field";
import NotiScreen from "../../../Setting/Notifire";
import RadioCustom1 from "../InforUser/RadioCustom1";
import ButtonCustom12 from "../ButtonCustom";



const width = Dimensions.get("window").width;

const OrderComplete = ({ onChange }) => {
  return (
    <>
      <View
        style={{
          backgroundColor: "white",
          height: width * 1.75,
          padding: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View>
          <NotiScreen
            iconImg={{uri:'https://cdn-icons-png.flaticon.com/512/148/148767.png'}}
            title={"Tạo đơn hàng thành công"}
            message={
              "Vui lòng nhấp vào xem chi tiết đơn hàng để xem trang thái đơn hàng của bạn. Chúc bạn có trải nghiệm mua hàng tốt tại ShopDunk."
            }
            idOrder={"251204"}
            labelClick={"Xem chi tiết đơn hàng"}
          />
        </View>
        <View style={styles.containerButton}>
          <ButtonCustom12
            styleBoder={{ borderColor: "rgb(55 128 216)" }}
            mode="flat"
            onPress={onChange}
            textColor={{ color: "rgb(55 128 216)" }}
          >
            TIẾP TỤC MUA HÀNG
          </ButtonCustom12>
        </View>

     

      

       
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  containerButton: {
    width: "100%",
    position: "absolute",
    bottom: 35,
  },
});
export default OrderComplete;
