import { View, Text, Dimensions, ScrollView, StyleSheet, TouchableOpacity, Image, StatusBar, SafeAreaView, Pressable } from 'react-native'
import React from 'react'
import Ionicon from 'react-native-vector-icons/Ionicons'
const { width, height } = Dimensions.get('window');
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { formatPrice } from '../../data/formatPrice';
import { useSelector, useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity,removeProduct } from '../../store/slice/cartSlice';

export default function ItemCart1({id,url, title, price, quanlity }) {
  const dispatch = useDispatch();
  const handleIncreaseQuantity = (id) => { 
    dispatch(increaseQuantity({ id }));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity({ id }));
  };

  const handleRemoveProduct = (id) => {
    dispatch(removeProduct({ id }));
  };
    return (
       <View style={{width: wp(95), height: hp(17)}} className="flex flex-row items-center bg-slate-200 rounded-2xl shadow-sm p-3 justify-around my-3" > 
        <Image style={{width:'30%', height: '100%'}} resizeMode='cover' source={{uri:url}}/>
        <View style={{width:'65%', height:'100%',}} className="flex-col justify-around">
          <Text className="font-bold text-lg">{title}</Text>
          <View className="flex-row" >
           <Text className="font-thin  text-lg">Màu sắc: </Text>
           <Text className=" text-lg" >Đen </Text>
          </View>
          {/* Price */}
          <Text className="font-bold text-green-900 text-lg">{formatPrice(price)}</Text>
           {/* Quanlity */}
           <View className="justify-end flex-row">
               <View className="bg-gray-300  flex-row items-center p-2 justify-around rounded-lg" style={{width:'50%'}} >
                 <Pressable onPress={() => handleDecreaseQuantity(id)} >
                   <Text>-</Text>
                 </Pressable>
                 <Text>{quanlity}</Text>
                 <Pressable onPress={() => handleIncreaseQuantity(id)} >
                   <Text>+</Text>
                 </Pressable>
               </View>
               <View >
               <Ionicon onPress={() => handleRemoveProduct(id)} className={'ml-3'} name='trash' size={30} color={'#339'} />
               </View>
           </View>
         </View>
 </View> 
    )
} 
 