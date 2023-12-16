import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { InputField, CustomButtonAuth } from "../components";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS } from "../constant/index";
import LoginSvg from "../assets/images/imgAuth/login.svg";
import * as Yup from 'yup';
import OverLayLoading from "../components/UI/OverLayLoading";
import { AuthContext } from "../store/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Popup from "../components/Setting/Popup";
import { useSelector, useDispatch } from 'react-redux';
import {addUser, isLogin, sttLogin} from './../store/slice/userSlice'
import { authenticate, isToken } from "../util/http";
const LoginScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({ email: '', pass: '' });
  const [formError, setFormError] = useState({ email: '', pass: '' });
  const [isCheck, setIsCheck] = useState(true);
  const [isPopup, setPopup] = useState(false);
  const userSchema = Yup.object().shape({
    email: Yup.string().email('Email không hợp lệ').required('Email không được để trống'),
    pass: Yup.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự').required('Password không được để trống'),
  });
  const getInfor = async () => {
    try {
      const account = await AsyncStorage.getItem('account');
      if (account !== null) {
        const parsedAccount = JSON.parse(account);
        setFormData(prevData => ({
          ...prevData,
          email: parsedAccount.email,
          pass: parsedAccount.pass,
        }));
      } else {
        console.log('Không có dữ liệu');
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getInfor();
  }, []);

  const dispatch = useDispatch(); 
  const setLoginStatus = (isLoggedIn) => {
    dispatch(isLogin(isLoggedIn));
    console.log(useSelector(sttLogin));
  };

  const isValidate = async () => {
    try {
      await userSchema.validate(formData, { abortEarly: false });
      setFormError({ email: '', pass: '' });
      try {
        const token = await authenticate(formData.email, formData.pass);
          if(token){
            AsyncStorage.setItem('token', JSON.stringify(token));
            const timeToken = await isToken(token);
            console.log(timeToken);
            if (timeToken) {
              dispatch(addUser(timeToken));
            }
            setLoginStatus(true);
          };
        if (isCheck) {
          AsyncStorage.setItem('account', JSON.stringify({
            email: formData.email,
            pass: formData.pass
          })).catch(error => console.error(error));
        } else {
          AsyncStorage.removeItem('account');
        }
      } catch (error) {
        console.log(error);
        setPopup(true);
      }
    } catch (error) {
      setFormError(
        error.inner.reduce((errors, err) => ({ ...errors, [err.path]: err.message }), {}),
      );
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: "center" }}>
          <LoginSvg width={300} height={300} style={{ transform: [{ rotate: "-5deg" }] }} />
        </View>
        <Text style={styles.titleLogin}>Login</Text>
        <InputField
          label={"Email ID"}
          keyBoardType={"email-address"}
          nameInput={"email"}
          value={formData.email}
          onChange={(prev) => setFormData({ ...formData, email: prev })}
          error={formError.email}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
        />
        <InputField
          label={"Password"}
          onChange={(prev) => setFormData({ ...formData, pass: prev })}
          error={formError.pass}
          nameInput={"pass"}
          value={formData.pass}
          inputType={"PassWord"}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          fieldButtonLabel={"Forget?"}
          fieldButtonFunction={() => navigation.navigate("ForgetScreen")}
        />
          <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={() => setIsCheck(!isCheck)} style={styles.checkbox}>
            { isCheck ? (
              <Ionicons
                name="checkbox-outline"
                size={20}
                color={COLORS.primary}
              />
            ) : (
              <Ionicons name="square-outline" size={20} color="#666" />
            )}
            <Text style={styles.checkboxLabel}>Remember Me</Text>
          </TouchableOpacity>
        </View>
        <CustomButtonAuth label={"Login"} onPress={isValidate} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("RegisterScreen");
          }}
          style={{ alignItems: "center", marginTop: 10 }}
        >
          <Text style={styles.textRegister}>New to the app? Register</Text>
        </TouchableOpacity>
      </View>
       {isPopup ?  <Popup title={'Đăng nhập'} message={'Đăng nhập thất bại vui lòng kiểm tra lại username và password'} imageUrl={'https://media.istockphoto.com/id/1393268049/vi/vec-to/bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-b%E1%BB%8B-t%E1%BB%AB-ch%E1%BB%91i-%C4%91%C3%A1nh-d%E1%BA%A5u-sai-kh%C3%B4ng-%C4%91%E1%BB%93ng-%C3%BD-%C4%91%C3%A1nh-d%E1%BA%A5u-ch%C3%A9o-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-l%E1%BB%97i-th%E1%BA%A5t-b%E1%BA%A1i-ho%C3%A0n.jpg?s=612x612&w=0&k=20&c=lJxRufC9xQhXncsv9faMMI1E7xFf5jCpO-3_gjR5-7c='}  onPress={() => setPopup(false) } /> : ''}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleLogin: {
    fontSize: 28,
    fontWeight: "500",
    marginBottom: 30,
    textAlign: "center",
  },
  textRegister: {
    color: COLORS.primary,
    fontWeight: "700",
  },
  checkboxcontainer: {    flexDirection: "row",    alignItems: "center",    marginBottom: 20,  },  checkbox: {    flexDirection: "row",    alignItems: "center",  },  checkboxLabel: {    marginLeft: 10,    fontSize: 16,  },
});
export default LoginScreen;
