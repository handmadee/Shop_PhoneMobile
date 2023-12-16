

import React, { useContext, useEffect, useState ,useLayoutEffect} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  OnBoardingScreen,
  LoginScreen,
  RegisterScreen,
  ForgetScreen,
  ChangePassScreen,
} from "../screens";
import User from "./User";

import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isToken } from "../util/http";
const Stack = createStackNavigator();
import { useSelector, useDispatch } from 'react-redux';
import { addUser, isLogin, selectUser, sttLogin} from './../store/slice/userSlice';

function AuthStack() {
  const [skipped, setSkipped] = useState(false);

  async function skipInit() {
    const skip = await AsyncStorage.setItem("Skipped");
    setSkipped(skip === "true");
  }
  useLayoutEffect(() => {
    skipInit();
  }, [skipInit, skipped]);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!skipped && (
        <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
      )}
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="ForgetScreen" component={ForgetScreen} />
      <Stack.Screen name="ChangePassScreen" component={ChangePassScreen} />
    </Stack.Navigator>
  );
}
function UserStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={User} />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  const [isLogged, setIsLogged] = useState(false);
  const [isCheck, setCheck] = useState(false);
  const dispatch = useDispatch();
  const status = useSelector(sttLogin); 
  
  console.log(status);
  useEffect(() => {
    const checkTokenAndSetUser = async () => {
      try {
        const data = await AsyncStorage.getItem("token");
        if (data) {
          const timeToken = await isToken(data);
          if (timeToken) {
            setIsLogged(true);
            dispatch(addUser(timeToken));
          } else {
            setIsLogged(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkTokenAndSetUser();
  }, [dispatch]);

  useEffect(() => {
    setCheck(status)    
  },[status]);

  return (
    <NavigationContainer>
      {isLogged || isCheck  ? <UserStack /> : <AuthStack />}
    </NavigationContainer>
  );
}