import { View, Text, Dimensions, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
const width = Dimensions.get("window").width;
import { useSelector, useDispatch } from 'react-redux';
import ItemCart1 from "../../../Setting/ItemCart1";
import { selectCartData, selectTotalPrice } from "../../../../store/slice/cartSlice";
import axios from 'axios';
import { Product } from "../../../Setting/Product";
import ButtonCustom from "../../ButtonCustom";
const page = (url) => `http://localhost:3006/api/v1/${url}`;
const OrderCart = ({ onChange }) => {
  const cart = useSelector(selectCartData);
  const sumCart = useSelector(selectTotalPrice);
  const [dataProduct, isdataProduct] = useState([]);
  // 
  useEffect(() => {
    try {
      axios.get(page('product/getProduct'))
      .then(function (res){
        console.log(res.data);
          return isdataProduct(res.data);
     })
      .catch(function (error) {
          return console.log(error);
     })
  } catch (error) {
      return console.log(error);
  }
  }, [cart]); 

  //
  return (
    <View style={{flex:'1'}}>
       <ScrollView
      style={{ backgroundColor: "#f8f8f8", height: '100%', padding: 20 }}
    >
        <View style={{width:'100%'}}> 
      {
          cart.map((item,index) => <ItemCart1 id={item.id} url={item.url} price={item.price} title={item.title} key={index} quanlity={item.quantity}/>)
      }
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      > 
        <Text style={{ letterSpacing: -1, color: "#6f7070" }}>
          ------------------------------
        </Text>
        <Text style={{ color: "#6f7070", marginHorizontal: 10 }}>
          Phụ kiện đi kèm
        </Text>
        <Text style={{ letterSpacing: -1, color: "#6f7070" }}>
          ------------------------------
        </Text>
      </View>
        <ScrollView>
        {
      <FlatList
      showsVerticalScrollIndicator={false}
      bounces={false}
       pagingEnabled
      data={dataProduct}
      renderItem={(item) => {
          return <Product
          id={item.item.id}
          url={item.item.url}
          title={item.item.title}
          detail={item.item.detail}
          price={item.item.price}
          count={item.item.count}
        />   
      }}
      keyExtractor={(item) => item.id}
      numColumns={2} 
     />
        }
        </ScrollView>
    </ScrollView>
      <View style={{  justifyContent: "flex-end", marginBottom: 20 }}>
        <ButtonCustom onPress={onChange} icon={"chevron-forward-outline"}>
          THÔNG TIN THANH TOÁN
        </ButtonCustom>
      </View>
    </View>
  );
};

export default OrderCart;
