import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import Ionicon from "react-native-vector-icons/Ionicons";
import {  useFavoriteProducts } from "../../context/context";
import { formatPrice } from "../../data/formatPrice";
import { useSelector, useDispatch } from 'react-redux';
import { addProduct } from "../../store/slice/cartSlice";
const { width, height } = Dimensions.get("window");



export default function ProductDetails({ route, navigation }) {
  const { productItem } = route.params;
  let priceNew = productItem.price - 30000;
  let priceOld =  productItem.priceu
  // time count down
  const [day, setday] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  // Set give up Discount 
  const targetDate = new Date("2024-1-10T00:00:00").getTime();
  // Use Layout -- Count time down 
  useLayoutEffect(() => {
    const updateCountdown = () => {
      const currentDate = new Date().getTime();
      const timeRemaining = targetDate - currentDate;

      if (timeRemaining <= 0) {
        setday(0);
        setHour(0);
        setMinute(0);
        setSecond(0);
      } else {
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        setday(days);
        setHour(hours);
        setMinute(minutes);
        setSecond(seconds);
      }
    };
    const intervalId = setInterval(updateCountdown, 1000);
    return () => clearInterval(intervalId);
  }, []); 
  // Favorite
  const { favoriteProducts, setFavoriteProducts } = useFavoriteProducts();
  const checkIL = () =>
    favoriteProducts.findIndex((item) => item.title === productItem.title);
  const indexIT = checkIL();
  const [isLiked, setIsLiked] = useState(indexIT !== -1);
  // Add to favorite
  const handlePress = () => {
    setIsLiked(!isLiked);
    setFavoriteProducts((prevFavoriteProducts) => {
      if (!isLiked) {
        // Nếu chưa thích, thêm productItem vào favoriteProducts
        return [...prevFavoriteProducts, productItem];
      } else {
        // Nếu đã thích, loại bỏ productItem khỏi favoriteProducts
        const updatedProducts = prevFavoriteProducts.filter(
          (item) => item.title !== productItem.title
        );
        return updatedProducts;
      }
    });
    console.log(favoriteProducts.length);
    dataFavorite = [...favoriteProducts];
  };  
  // ADD TO CART
  const dispatch = useDispatch();

  
  // BUY NOW
  const buyNow = () => {
    console.log("Buy Now");
  }

  return (
    <View className="items-center flex-1 pt-5 bg-neutral-100">
      <View
        style={{ height: height * 0.08, width: width }}
        className="flex-row items-center justify-between bg-slate-200"
      >
        <TouchableOpacity
          className="items-center justify-center w-10 h-10 ml-4 rounded-xl bg-slate-400 "
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text>
            {<Ionicon name="chevron-back-outline" size={30} color={"white"} />}
          </Text>
        </TouchableOpacity>
        <View className="w-full" style={{ width: width - 56 }}>
          <Text className="text-xl font-semibold text-center text-gray-700">
            {productItem.title}
          </Text>
        </View>
      </View>
      <View style={{ height: height * 0.72 }}>
        <ScrollView>
        <View
                    className="items-center justify-center"
                    style={{ height: height * 0.4, width: width }}
                  >
                    <Image  style={st.img} source={{uri:productItem.url}} />
       </View>
          <View
            style={st.price}
            className="flex-row bg-gray-300 justify-aroundr "
          >
            <View
              style={{ width: width * 0.5 }}
              className="items-center justify-center h-full"
            >
              <Text className="text-xl font-bold text-orange-600">
                {formatPrice(priceNew)}₫
              </Text>
              <Text
                className="text-xs text-center text-zinc-400"
                style={{ textDecorationLine: "line-through" }}
              >
                       {formatPrice(priceOld)}₫
              </Text>
            </View>
            <View className="items-center justify-center">
              <Text className="mb-2 text-xl font-medium text-orange-600">
                ƯU ĐÃI CÒN LẠI 
              </Text>
              <View className="flex-row">
                <View style={[st.itemTime]}>
                  <Text style={[st.textTime]}>{day}</Text>
                </View>
                <View style={[st.itemTime]}>
                  <Text style={[st.textTime]}>{hour}</Text>
                </View>
                <View style={[st.itemTime]}>
                  <Text style={[st.textTime]}>{minute}</Text>
                </View>
                <View style={[st.itemTime]}>
                  <Text style={[st.textTime]}>{second}</Text>
                </View>
              </View>
            </View>
          </View>

          <View className="m-5 ">
            <View>
              <Text className="text-2xl">{productItem.title}</Text>
            </View>

            <TouchableOpacity onPress={handlePress}>
              <Ionicon
                name={isLiked ? "heart" : "heart-outline"}
                size={25}
                color={"red"}
              />
            </TouchableOpacity>

            <View className="my-4">
              <Text className="text-gray-400">
                Số lượng sản phẩm trong kho: {productItem.count}
              </Text>
            </View>

            <View className="justify-between w-full px-2 py-3 my-5 border border-gray-400 h-60 rounded-xl">
              <View className="flex-row items-center m-2">
                <Ionicon
                  name="checkmark-circle"
                  size={25}
                  color={"rgb(37 99 235)"}
                ></Ionicon>
                <Text className="mx-1">
                  Bộ sản phẩm gồm: Hộp, Sách hướng dẫn, Cây lấy sim, Cáp
                  Lightning - Type C
                </Text>
              </View>

              <View className="flex-row items-center m-2">
                <Ionicon
                  name="checkmark-circle"
                  size={25}
                  color={"rgb(37 99 235)"}
                ></Ionicon>
                <Text className="mx-1">Bảo hành chính hãng 1 năm</Text>
              </View>

              <View className="flex-row items-center m-2">
                <Ionicon
                  name="checkmark-circle"
                  size={25}
                  color={"rgb(37 99 235)"}
                ></Ionicon>
                <Text className="mx-1">Giao hàng nhanh toàn quốc</Text>
              </View>

              <View className="flex-row items-center m-2">
                <Ionicon
                  name="checkmark-circle"
                  size={25}
                  color={"rgb(37 99 235)"}
                ></Ionicon>
                <Text className="mx-1">Hoàn thuế cho người nước ngoài</Text>
              </View>
            </View>

            <View className="my-5">
              <Text className="my-2 text-lg font-bold">
                Thông tin sản phẩm:
              </Text>
              <Text className="text-base text-justify">
                {productItem.detail}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <View
        style={{ height: height * 0.1, width: width }}
        className="items-center, flex, flex-row , justify-around"
      >
        {/* ADD to cart  */}
        <TouchableOpacity
          className="bg-orange-400  rounded-xl mt-4"
          style={{ width: width * 0.45 , height:"70%"}}
          onPress={() => dispatch(addProduct(productItem))}
        >
          <Text className="my-auto text-xl font-medium text-center text-white">
            Thêm vào giỏ hàng
          </Text>
        </TouchableOpacity>
        {/* Add to pay  */}
        <TouchableOpacity
          className="bg-green-600  rounded-xl mt-4"
          style={{ width: width * 0.45 , height:"70%"}}
          onPress={() => {
         
          }}
        >
          <Text className="my-auto text-xl font-medium text-center text-white">
            Mua ngay
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const st = StyleSheet.create({
  imgProduct: {
    height: height * 0.4,
    width: width,
    backgroundColor: "white",
  },
  img: {
    width: '100%',
    height:'100%',
    objectFit: "contain",
  },
  price: {
    width: width,
    height: 90,
    // backgroundColor: 'black'
  },
  itemTime: {
    width: 30,
    height: 30,
    borderWidth: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "rgb(234 88 12)",
    borderRadius: 5,
    marginHorizontal: 10,
    backgroundColor: "black",
  },
  textTime: {
    fontSize: 17,
    fontWeight: "500",
    color: "white",
  },
});
