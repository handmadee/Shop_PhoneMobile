import {
    View,
    Text,
    TouchableOpacity,
    Image,
  } from "react-native";
  import React from "react";
import { formatPrice } from "../../data/formatPrice";
import { useNavigation } from '@react-navigation/native';
export const Product = ({id,url,title,detail,price,count,index}) => { 
    const navigation = useNavigation();
    let priceNew = formatPrice((price*0.85).toFixed(0));
    let priceOld = formatPrice(price);
    const navigateToProductDetails = () => {
      navigation.navigate("ProductDetails", { productItem: {
        id:id,
        index: id ,url:url,title:title,detail:detail,price:price,count:count} });
    };
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          navigateToProductDetails();
        }}
        className="items-center mx-2 bg-white rounded-lg w-44 h-80"
        style={{
          elevation: 5,
          shadowColor: "black",
          shadowOffset: { width: 1, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          marginVertical: 10
        }}
      >
        <View className="h-40 mt-6">
          <Image
            className="w-36 h-36"
            style={{ objectFit: "contain" }}
            source={{uri:url}}
          />
        </View>
        <View className="h-16">
          <Text className="text-base font-medium">{title}</Text>
        </View>
        <View className="mt-3">
          <Text className="text-base text-blue-600">{priceNew}</Text>
          <Text
            className="text-xs text-center text-zinc-400"
            style={{ textDecorationLine: "line-through" }}
          >
            {priceOld}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };