import { StatusBar, View } from "react-native";
import React, { useEffect, useState } from "react"
import { SafeAreaView } from "react-native";
import OrderCart from "../../../../components/UI/datsatus/Order/OrderCart";
import OrderInfor  from "../../../../components/UI/datsatus/Order/OrderInfor";
import OrderPayment from "../../../../components/UI/datsatus/Order/OrderPayment";
import OrderComplete  from "../../../../components/UI/datsatus/Order/OrderComplete";
import OrderStatus from "../OrderStatus";
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from "../../../../store/slice/cartSlice";

const Order = () => {
  const [isActive, setIsActive] = useState(1);
  const [showPopup, setShowPopup] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  function increasePage() {
    setIsActive(isActive + 1);
  }
  function PageSwitchHanlder({ page }) {
    console.log(page);
    switch (page) {
      case 1:
        return <OrderCart onChange={increasePage} />;
      case 2:
        return <OrderInfor onChange={increasePage} />;
      case 3:
        return <OrderPayment onChange={increasePage} />;
      case 4:
        return <OrderComplete onChange={increasePage} />;
      default:
        dispatch(clearCart)
        setIsActive(1);
        return (
       navigation.navigate('HomeUserStack')
        );
    }
  }
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
      <OrderStatus active={isActive} />
      <View  style={{width:'100%', height:'90%'}}>
      <PageSwitchHanlder page={isActive} />
        </View>
    </SafeAreaView>
  );
};

export default Order;
