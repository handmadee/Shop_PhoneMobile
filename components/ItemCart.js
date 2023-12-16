import { Image, StyleSheet, Text, TouchableOpacity, View,} from 'react-native'
import React, { useEffect, useState } from 'react'
import moment from 'moment/src/moment'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { Swipeable } from 'react-native-gesture-handler'
import { CartProduct } from '../context/context'


const ItemCart = ({ product, id, amount, setAmount, navigation }) => {

    const { cart, setCart } = CartProduct();

    const p = product.quantity * product.product.priceNew
    const price = p.toLocaleString("en-US")


    const [quant, setQuantity] = useState(1);

    moment.locale('vi');
    const t = new Date()

    const [check, setCheck] = useState(false);


    const [showItem, setShowItem] = useState(false)

    const right = () => {
        return (
            <View className='w-1/4 h-full justify-center items-center'>
                <TouchableOpacity className='justify-center items-center w-20 h-20 rounded-xl' key={id} style={[st.shadow]} onPress={()=>{deleteItemCart(id)}}>
                    <Text className='text-red-500 text-base font-semibold'>Hủy đơn</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <Swipeable renderRightActions={right} key={id}>
            <View className=' mx-auto my-5 py-3 rounded-xl px-2 flex-row justify-between' style={[st.shadow, { width: '95%' }]}>

                <View style={[{ width: "95%" }]} >
                    <View className='flex-row justify-between items-center'>
                        <View>
                            <Text className='text-base my-1 font-semibold'>Sản Phẩm: {product.product.title}</Text>
                            <Text className='text-zinc-400'>Số Lượng: {product.quantity}</Text>
                        </View>
                        <View>
                            <View className='justify-center items-center w-10'>
                                <TouchableOpacity onPress={() => { setShowItem(!showItem) }}>
                                    <Ionicon name={showItem ? 'chevron-up' : 'chevron-down'} color={'rgb(234 88 12)'} size={25} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {showItem && (
                        <View className='mt-2 flex-row items-center justify-center'>
                            <Image className='w-24 h-28 mx-2' source={product.product.img[0]} />
                            <View className='w-3/6 justify-center'>
                                <Text className='mb-4'>Product in stock: {product.product.quantity}</Text>
                                <Text className='mb-4'>Price: {(product.product.priceNew).toLocaleString("en-US")}₫</Text>
                                <View className='justify-center items-center  flex-row bg-slate-300 rounded' style={{ width: "65%" }}>
                                    <TouchableOpacity className=' justify-center items-center' onPress={() => {  }}>
                                        <Ionicon name='remove' size={25} />
                                    </TouchableOpacity>
                                    <Text className='mx-5 text-lg'>{product.quantity}</Text>

                                    <TouchableOpacity  className=' justify-center items-center' onPress={() => { '' }}>
                                        <Ionicon name='add' size={25} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                    <Text className='text-red-400 mt-5 text-xl'>price: {price}₫</Text>
                </View>
            </View>
        </Swipeable>
    )
}

const st = StyleSheet.create({
    shadow: {
        shadowColor: '#8c8c8c', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 7, backgroundColor: '#ffffff',
    }
})

export default ItemCart

