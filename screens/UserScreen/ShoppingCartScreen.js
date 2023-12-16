import { View, Text, Dimensions, ScrollView, StyleSheet, TouchableOpacity, Image, StatusBar, SafeAreaView, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get('window');
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { formatPrice } from '../../data/formatPrice';
import { useSelector, useDispatch } from 'react-redux';
import ItemCart1 from '../../components/Setting/ItemCart1';
import { selectCartData,selectTotalPrice } from '../../store/slice/cartSlice';

export default function ShoppingCartScreen({ navigation }) {
  // cart, setCart
  const cart = useSelector(selectCartData);
  const sumCart = useSelector(selectTotalPrice);

  // Render Item Cart
  const renderCart = () => {
    if (cart.length == 0) {
      return (
        <View style={styles.center}>
          <Image style={styles.nullImage} source={require('../../assets/null.png')} />
        </View>
      )
    } else {
      console.log(cart);
      return (
        cart.map((item,index) => <ItemCart1 id={item.id} url={item.url} price={item.price} title={item.title} key={index} quanlity={item.quantity}/>)
      )
    }
  }

  // -- Onpress 
  const add = () => '';
  const subtraction = () => '';

  // Xử lý khi mua ngay 
  const buy = () => {
    navigation.navigate("Order");
  } 

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.mainView}>
        <View style={styles.cartHeader}>
          <Text style={styles.cartHeaderText}>Cart</Text>
          <TouchableOpacity style={styles.cartIcon} onPress={() => { navigation.navigate("SettingUser", {screen: 'Buy'})}}>
            <Ionicon name='cart-outline' size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.cartListContainer}>
          <ScrollView style={styles.cartListScroll}>
            {renderCart()}
          </ScrollView>
          {cart.length > 0 && (
            <TouchableOpacity style={styles.buyNowButton} onPress={() => { buy() }}>
              <Text style={styles.buyNowText}>
                Mua ngay: {formatPrice(sumCart)}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  mainView: {
    height: '100%',
  },
  cartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },
  cartHeaderText: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 20,
  },
  cartIcon: {
    marginRight: 20,
  },
  cartListContainer: {
    height: '93%',
    width: '92%',
    margin: 0,
    borderRadius: 20,
    overflow: 'hidden',
    margin: 'auto',
  },
  cartListScroll: {
    height: '90%',
  },
  buyNowButton: {
    backgroundColor: '#FFA500',
    width: '100%',
    height: '8%',
    marginVertical: 20,
    marginLeft: 20
  },
  buyNowText: {
    textAlign: 'center',
    lineHeight: 40,
    fontSize: 20,
    fontWeight: '500',
    color: '#FFF',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  nullImage: {
    width: 60,
    height: 60,
  },
});
