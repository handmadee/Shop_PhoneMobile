import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity, ScrollView, Alert } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS } from "../constant/index";
import RegisterSvg from "../assets/images/imgAuth/registration.svg";
import GoogleSvg from "../assets/images/imgAuth/google.svg";
import FacebookSvg from "../assets/images/imgAuth/facebook.svg";
import TwitterSvg from "../assets/images/imgAuth/twitter.svg";
import { CustomButtonAuth, InputField } from "../components";
import { createUser } from "../util/http";
import * as Yup from "yup";
import NotiScreen from './../components/Setting/Notifire'
const RegisterScreen = ({ navigation }) => {
  const [inputs, setInputs] = useState({
    fullName: '',
    email: '',
    phone: '',
    pass: '',
    rPass: ''
  });

  const [error, setError] = useState({
    fullName: '',
    email: '',
    phone: '',
    pass: '',
    rPass: ''
  });

  const [IsCheck, setIsCheck] = useState(false);




  const SubmitRegisterHandler = async () => {
    try {
      const userSchema = Yup.object().shape({
        fullName: Yup.string().required("Full Name không được để trống"),
        email: Yup.string().email("Email không hợp lệ").required("Email không được để trống"),
        phone: Yup.string()
          .matches(/^[0-9]+$/, 'Số điện thoại chỉ được chứa các ký tự số')
          .required('Phone Number không được để trống'),
        pass: Yup.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự").required("Password không được để trống"),
        rPass: Yup.string()
          .oneOf([Yup.ref("pass"), null], "Mật khẩu không khớp")
          .required("Confirm Password không được để trống"),
      });

      await userSchema.validate(inputs, { abortEarly: false });
      signUpHandler(inputs.email, inputs.pass, inputs.fullName, inputs.phone);
    } catch (validationError) {
      if (validationError instanceof Yup.ValidationError) {
        const errorMessages = {};
        validationError.inner.forEach(err => {
          errorMessages[err.path] = err.message;
        });
        setError(errorMessages);
      }
    }
  };

  async function signUpHandler(email, pass, fullname, phone) {
    for (const key in error) {
      setError(prevState => ({ ...prevState, [key]: '' }));
    }
    await createUser(email, pass, fullname, phone);
    setIsCheck(true);
  }

  return (
    IsCheck ? (
      <NotiScreen iconImg={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRexcicwr6DnWhlNG46M3bIhhb2VxMV7MeSbCD-xHOrkLBMd2e5Yj4olRVK4wovt6b7PY4&usqp=CAU'} message={"Đăng kí thành công"} labelBtn={"Trờ về màn hình đăng nhập"} onPress={() => navigation.goBack()} />
    ) : (
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 25 }}>
          <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
          <View style={{ alignItems: "center" }}>
            <RegisterSvg width={300} height={300} style={{ transform: [{ rotate: "-5deg" }] }} />
          </View>
          <Text style={styles.titleRegister}>Register</Text>

          <InputField
            label={"Full Name"}
            nameInput={"fullName"}
            value={inputs.fullName}
            onChange={(prev) => setInputs({ ...inputs, fullName: prev })}
            error={error.fullName}
            icon={<Ionicons name="person-outline" size={20} color="#666" style={{ marginRight: 5 }} />}
          />
          <InputField
            label={"Email ID"}
            nameInput={"email"}
            value={inputs.email}
            onChange={(prev) => setInputs({ ...inputs, email: prev })}
            keyBoardType={"email-address"}
            error={error.email}
            icon={<MaterialIcons name="alternate-email" size={20} color="#666" style={{ marginRight: 5 }} />}
          />
          <InputField
            label={"Phone Number"}
            value={inputs.phone}
            onChange={(prev) => setInputs({ ...inputs, phone: prev })}
            nameInput={"phone"}
            keyBoardType={"numeric"}
            error={error.phone}
            icon={<Ionicons name="call-outline" size={20} color="#666" style={{ marginRight: 5 }} />}
          />
          <InputField
            label={"Pass word"}
            value={inputs.pass}
            onChange={(prev) => setInputs({ ...inputs, pass: prev })}
            nameInput={"pass"}
            inputType={"PassWord"}
            error={error.pass}
            icon={<Ionicons name="ios-lock-closed-outline" size={20} color="#666" style={{ marginRight: 5 }} />}
          />
          <InputField
            label={"Confirm PassWord"}
            nameInput={"rPass"}
            value={inputs.rPass}
            onChange={(prev) => setInputs({ ...inputs, rPass: prev })}
            inputType={"PassWord"}
            error={error.rPass}
            icon={<Ionicons name="ios-lock-closed-outline" size={20} color="#666" style={{ marginRight: 5 }} />}
          />
          <CustomButtonAuth label={"Register"} onPress={SubmitRegisterHandler} />
          <Text style={styles.textLoginWith}>Or, Register with other...</Text>
          <View style={styles.containerLoginMedia}>
          </View>
          <View style={styles.containerRegister}>
            <Text>Already register?</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.textRegister}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>)
  );
};



const styles = StyleSheet.create({
  titleRegister: {
    fontSize: 28,
    fontWeight: "500",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 30,
  },
  textInput: {
    flex: 1,
    paddingVertical: 0,
  },
  textLogin: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 18,
    color: "#fff",
  },
  textLoginWith: {
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
  },
  containerLoginMedia: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  loginMedia: {
    borderColor: "#ddd",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  containerRegister: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  textRegister: {
    color: COLORS.primary,
    fontWeight: "700",
    marginLeft: 5,
  },
  calendarInput: {
    alignItems: "center",
    flexDirection: "row",
    borderColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 30,
  },
});

export default RegisterScreen;

