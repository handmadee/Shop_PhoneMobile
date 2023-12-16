import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeUser, SettingUserScreen, ShoppingCartScreen, FavoriteProductsScreen } from '../screens';
import HomeUserStack from './HomeUserStack';
import UserDrawer from './UserDrawer';
import TopTabNavigation from './TopTabNavigation';
import OrderPayment from './OrderPayment';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Field from '../components/InforUser/Field';


export default function User() {
    const UserStack = createBottomTabNavigator();
    const size = 30;
    const { width, height } = Dimensions.get('window')
    return (
        <UserStack.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                justifyContent: 'space-between',
                alignItems: 'center',
                height: height * 0.07,
            },
            tabBarIcon: ({ focused, color }) => {
                if (route.name === 'HomeUserStack') {
                    return (
                        <View style={[st.container, { backgroundColor: focused ? '#f2f2f2' : 'white', }]}>
                            <Ionicon name='analytics-outline' size={size} color={focused ? 'coral' : '#676767'} />
                            {focused && <Text style={st.text}>Home</Text>}
                        </View>
                    )

                } else if (route.name === 'SettingUser') {
                    return (
                        <View style={[st.container, { backgroundColor: focused ? '#f2f2f2' : 'white', }]}>
                            <Ionicon name='person-outline' size={size} color={focused ? 'coral' : '#676767'} />
                            {focused && <Text style={st.text}>User</Text>}
                        </View>
                    )
                } else if (route.name === 'ShoppingCart') {
                    return (
                        <View style={[st.container, { backgroundColor: focused ? '#f2f2f2' : 'white', }]}>
                            <Ionicon name='cart-outline' size={size} color={focused ? 'coral' : '#676767'} />
                            {focused && <Text style={st.text}>Cart</Text>}
                        </View>
                    )
                } else if (route.name === 'FavoriteProducts') {
                    return (
                        <View style={[st.container, { backgroundColor: focused ? '#f2f2f2' : 'white', }]}>
                            <Ionicon name='heart-outline' size={size} color={focused ? 'coral' : '#676767'} />
                            {focused && <Text style={st.text}>Favorite</Text>}
                        </View>
                    )
                }
           

            }
        })}>
            <UserStack.Screen name='HomeUserStack' component={HomeUserStack} />
            <UserStack.Screen name='FavoriteProducts' component={FavoriteProductsScreen} />
            <UserStack.Screen name='ShoppingCart' component={OrderPayment} />
            <UserStack.Screen name='SettingUser' component={UserDrawer} />
        </UserStack.Navigator>
    )
}


const st = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        width: "90%",
        height: "80%"

    },
    text: {
        marginStart: 2,
        color: 'rgb(39 39 42)',
        fontWeight: '600'
    }
})


  