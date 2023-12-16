
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  Alert,
  FlatList,
} from "react-native";
import React, { useState, useEffect, useRef, useContext } from "react";
import Ionicon from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get("window");
import AsyncStorage from "@react-native-async-storage/async-storage";
import OverLayLoading from "../../components/UI/OverLayLoading";
import axios from 'axios';
import { formatPrice } from "../../data/formatPrice";
const page = (url) => `http://localhost:3006/api/v1/${url}`;
import { useSelector, useDispatch } from 'react-redux';
import { isLogin } from "../../store/slice/userSlice";
import { Product } from "../../components/Setting/Product";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export default function HomeUser({ navigation }) {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [isLoging, setIsLoging] = useState(false);
  const [dataProduct, isdataProduct] = useState([]);
  const dispatch = useDispatch();
  const logOut1 = () => dispatch(isLogin(false));
 // Get Product 
 useEffect(() => {
  try {
    axios.get(page('product/getProduct'))
    .then(function (res){
        return isdataProduct(res.data);
   })
    .catch(function (error) {
        return console.log(error);
   })
} catch (error) {
    return console.log(error);
}
}, []); 

  const updateSeach = (vl) => {
    setSearch(vl);
    // console.log(vl);
    if (vl.trim() == "") {
      setShowSearch(false);
    } else {
      setShowSearch(true);
    }
  };
  const imgSliderHome = [
      {
          img: require('./../../assets/images/imgSlider/ima3.jpg')
      },
      {
        img: require('./../../assets/images/imgSlider/ima1.jpg')
      },
      {
        img: require('./../../assets/images/imgSlider/ima2.jpg')
      },
      {
        img: require('./../../assets/images/imgSlider/ima4.jpg')
      },
      {
        img: require('./../../assets/images/imgSlider/ima5.jpg')
      },
      {
        img: require('./../../assets/images/imgSlider/ima6.jpg')
      }
  ]

  const [indexSlide, setindexSlide] = useState(0);
  const scrollRef = useRef();
  let timeoutRef = useRef(null);

  const onChange = (nativeEvent) => {
    if (nativeEvent) {
      clearTimeout(timeoutRef.current);
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
      );
      setindexSlide(slide);
      timeoutRef.current = setTimeout(autoSlide, 4000);
    }
  };

  const autoSlide = () => {
    let i = (indexSlide + 1) % imgSliderHome.length;
    setindexSlide(i);
    scrollRef.current.scrollTo({
      animated: true,
      x: width * i,
    });
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(autoSlide, 4000);
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const dots = imgSliderHome.map((i, index) => (
    <TouchableOpacity
      key={index}
      style={{alignItems:'center', justifyContent:'center', height: '3rem', marginHorizontal: 10}}
    >
      <Text
        style={{
          fontSize: 48, 
          height: 48,
          fontWeight: indexSlide === i.id ? '800' : '300', 
          color: indexSlide === i.id ? 'black' : 'gray', 
        }}
        onPressIn={() => { }}
      >
        -
      </Text>
    </TouchableOpacity>
  ));
  const [pagination, setPagination] = useState(['Tất cả', 'iPhone', 'iPad', 'Macbook']);
  const [activeId, setActiveId] = useState(0);
  const setActiveTitle = (id) => {
    setActiveId(id);
    console.log(id);
  };

  const filteredData = dataProduct.filter(item => item.category_id === 3);

  return (
    <View style={[st.container]}>
      <View style={[{ height: height * 0.03 }]}>
      </View>
      <ScrollView style={[{}]}>
        <View style={[{ backgroundColor: '#f2f2f2', width: width, paddingVertical: 10, alignItems: 'center', paddingBottom: '10%' }]}>
          {/* header text */}
          <View style={[{ width: width, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
            <View style={[{ width: '50%' }]}>
              <Text style={[st.text, { marginStart: 20 }]}>Xin chào!</Text>
              <Text style={[{ fontSize: 25, marginStart: 20, marginVertical: 20, fontWeight: 500 }]}>Nguyễn Văn Dũng</Text>
            </View>
            <View style={[{ width: '50%', alignItems: 'center' }]}>
              <Image style={{ width: width * 0.2, height: width * 0.2, borderRadius: '100%' }} source={require('./../../assets/images/informationUser/bg_user.png')} />
            </View>
          </View>
          {/* header search */}
          <View style={[{ width: '90%', height: 50, backgroundColor: '#fff', borderRadius: '100%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }]}>
            <TextInput
                 value={search}
                 onChangeText={updateSeach}
             placeholder='Shearch "iPhone 15 Pro Max"
            ' style={[{ marginStart: 20, fontSize: 15, width: '80%', height: '100%' }]}  />
            <TouchableOpacity style={[{ backgroundColor: '#999999', height: '100%', justifyContent: 'center', alignItems: 'center', aspectRatio: 1, borderRadius: '100%' }]}>
              <Ionicon name="search-outline" size={25} color={'#fff'} />
            </TouchableOpacity>
          </View>
          
        </View>
        {/* Slider */}
        <View style={[{ flex: 1 }]}>
          <View style={[{ width: "100%" }]}>
            <ScrollView
              onScroll={({ nativeEvent }) => onChange(nativeEvent)}
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              horizontal
              className="bg-white "
              ref={scrollRef}
              scrollEventThrottle={32}
            >
              {imgSliderHome.map((img, index) => {
                return (
                  <View
                    key={index}
                    className="items-center justify-center"
                    style={{ width: width }}
                  >
                    <Image
                      className="object-contain"
                      style={[{ width: width, height: width }]}
                      source={img.img}
                    />
                  </View>
                );
              })}
            </ScrollView>
            <View
            
              style={{flexDirection:'row', alignItems:'center', justifyContent:'center',width:width}}
            >
              {dots}
            </View>
          </View>
        </View>

        {/* product */}
        <View>
          {/* Menu Product*/}
          <View style={[{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}]}>
            {pagination.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={[{marginHorizontal: 18, justifyContent: 'center', alignItems: 'center', borderRadius: '10%', backgroundColor: index == activeId ? "#cbd5e1" : "", padding: 5}]}
                  onPress={() => setActiveTitle(index)}
                >
                <Text style={[{fontFamily: 'medium'}, activeId === index ? {color: 'white'} : {color: 'gray'}]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          {/* Hiển thị Product  */}
          <View className="" style={{ flex: 0.9 }}>
        {/* dA  */}        
           {/* SHOW SẺ */}
          <View className="items-center p-5 bg-">
            {showSearch ? (
              <>
                <View
                  className="items-center mt-5 justify-"
                  style={{ width: width * 0.9, height: height * 0.5 }}
                >
                  <View className="flex-row items-center w-full">
                    <Text className="text-base">Từ khóa: "{search}" </Text>
                    <TouchableOpacity
                      className="ml-2 bg-black rounded-full"
                      onPress={() => {
                        setShowSearch(false);
                        setSearch("");
                      }}
                    >
                      <Ionicon name="close" color={"white"} size={14} />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{ width: width * 0.91, height: height * 0.5 }}
                    className="2mt-5"
                  >
                    <ScrollView
                      showsHorizontalScrollIndicator={false}
                      pagingEnabled
                      horizontal
                      className="h-52"
                    >
                      {(() => {
                        const filteredProducts = dataProduct.filter((item) =>
                          item.title
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        );

                        if (filteredProducts.length === 0) {
                          return (
                            <View className="items-center w-full">
                              <Text className="text-center">
                                Không tìm thấy sản phẩm!!
                              </Text>
                            </View>
                          );
                        }

                        // Trả về mảng sản phẩm thỏa mãn điều kiện
                        return filteredProducts.map((item, i) =>
                          Product(item, i)
                        );
                      })()}
                    </ScrollView>
                  </View>
                </View>
              </>
            ) : (
              <>
                {/* iphone */}
                <View
                  className="items-center justify-center mt-5"
                  style={{ width: width * 0.9, height: height * 0.4 , marginTop: 20}}
                >
                       <Text style={{ marginBottom: 5, fontSize: 28, fontWeight: '500', marginLeft:20 }}>Iphone</Text>
                  <View
                    style={{ width: width * 0.91, height: '100%' }}
                  >
                    <ScrollView
                      showsHorizontalScrollIndicator={false}
                      pagingEnabled
                      horizontal
                      className="h-40"
                    >
                      {/* product */}
                      {dataProduct.map((item, i) => {
                        if (item.category_id == 2) {
                           return <Product
                           key={i} 
                           id={item.id}
                           url={item.url}
                           title={item.title}
                           detail={item.detail}
                           price={item.price}
                           count={item.count}
                         />
                        }
                      })}
                    </ScrollView>
                  </View>
                </View>

                {/* iPad */}
                <View
                  className="items-center justify-center mt-10"
                  style={{ width: width * 0.9, marginTop: 20}}
                >
                 <Text style={{ marginBottom: 5, fontSize: 28, fontWeight: '500', marginLeft:20 }}>Ipad</Text>
                  <View
                    style={{ width: width * 0.91 }}
                    className=""
                  >
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      bounces={false}
                       pagingEnabled
                      data={filteredData}
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
                      {/*  */}
                  </View>
                </View>
                {/* Macbook */}
                <View
                  className="items-center justify-center mt-10"
                  style={{ width: width * 0.9, height: height * 0.5 , marginTop: 20}}
                >
                              <Text style={{ marginBottom: 5, fontSize: 28, fontWeight: '500', marginLeft:20, 
                             }}>Macbook</Text>
                  <View
                    style={{ width: width * 0.91, height: height * 0.5 }}
                    className=""
                  >
                    <ScrollView
                      showsHorizontalScrollIndicator={false}
                      pagingEnabled
                      horizontal
                      className="h-52"
                  
                    >
                      {/* product */}
                      {dataProduct.map((item, i) => {
                        if (item.category_id == 1) {
                          return <Product
                           key={i} 
                           id={item.id}
                           url={item.url}
                           title={item.title}
                           detail={item.detail}
                           price={item.price}
                           count={item.count}
                         />
                        }
                      })}
                    </ScrollView>
                  </View>
                </View>
              </>
            )}
          </View>
      </View>



        </View>
      </ScrollView>
    </View>
  );
}
const st = StyleSheet.create({
  container: {
    width: width,
    height: height * 0.93,
    backgroundColor: '#fff'
  },
  shadowHeader: {
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  text_logo: {
    fontFamily: "cursive",
  },
  img: {
    width: width,
    height: "100%",
  },
  text: {
    fontSize: 20
  },


  
});