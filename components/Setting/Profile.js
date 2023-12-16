import { View, Text, Dimensions, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Field from "../InforUser/Field";
import RadioCustom from "../Setting/Radio";
import ButtonCustom from "../Setting/Button"
import { useSelector, useDispatch } from 'react-redux';;
import { addlocation, selectlocation } from "../../store/slice/locationSlice";
import { createLocation, getLocation } from "../../util/http";
import Popup from "./Popup";
import { idUser } from "../../store/slice/userSlice";

export default function DetailInforUser() {
  const dispatch = useDispatch;
  const saveInfor = (item) => dispatch(addlocation(item))
  const id1 = useSelector(idUser);
  useEffect(() => {
    getLocation(id1)
      .then((data) => {
        console.log(data.data);
      })
      .catch((error) => console.log(error));
  }, [id1]);
 const User =  useSelector(selectlocation);

//  Xet INPUT
  const [selectedValue, setSelectedValue] = useState("Nam");
  const [input, setInput] = useState({
    name: User.name,
    city: User.city,
    district: User.district,
    address: User.location,
    email: User.username,
    phone: User.phone,
  });
  const [isShow,setShow] = useState(false);
  const handleRadioButtonChange = (value) => {
    setSelectedValue(value);
  };
  function onChangeInputHandler(entered, fieldInput) {
    setInput((prevInput) => ({
      ...prevInput,
      [fieldInput]: entered,
    }));
  }
//
 async function saveInforUserHandler() {
       for (const key in input) {
          if(input[key] == '') return setShow(true);
       }
       try {
          const data = await createLocation(input.name,input.city,input.district,input.address, input.phone,id);
          saveInfor({city:"Đạt"});
       } catch (error) {   
        console.log(error);
        
       }
  }
  return (
    <View style={st.container}>
      <View style={st.bgPosi}></View>
      <View style={[st.shadow]} className="bg-white rounded-xl">
        <View style={st.inforContainer}>
          <Field
            icon={"person-outline"}
            label={"Name"}
            infor={input.name}
            data={input.name}
            setData={onChangeInputHandler}
            mode={true}
          />
           <Field
            icon={"location-outline"}
            label={"City"}
            infor={input.city}
            data={input.city}
            setData={onChangeInputHandler}
            mode={true}
          />
           <Field
            icon={"location-outline"}
            label={"District"}
            infor={input.district}
            data={input.district}
            setData={onChangeInputHandler}
            mode={true}
          />
          <Field
            icon={"location-outline"}
            label={"Address"}
            infor={input.address}
            data={input.address}
            setData={onChangeInputHandler}
            mode={true}
          />
          <Field
            icon={"call-outline"}
            label={"Phone"}
            infor={input.phone}
            data={input.phone}
            setData={onChangeInputHandler}
            mode={true}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18 }}>Giới tính: </Text>
            <RadioCustom
              label={"Nam"}
              value={"Nam"}
              selectedValue={selectedValue}
              onChange={handleRadioButtonChange}
            />
            <RadioCustom
              label={"Nữ"}
              value={"Nữ"}
              selectedValue={selectedValue}
              onChange={handleRadioButtonChange}
            />
            <RadioCustom
              label={"Khác"}
              value={"Khác"}
              selectedValue={selectedValue}
              onChange={handleRadioButtonChange}
            />
          </View>
          <ButtonCustom
            style={st.btnStyle}
            mode={"flat"}
            onPress={() => console.log("xóa tài khoản lun mò")}
          >
            Xóa tài khoản
          </ButtonCustom>
          <ButtonCustom
            onPress={ saveInforUserHandler
             
            }
           >
            Lưu Lại
          </ButtonCustom>
        </View>
      </View>
      {isShow ?    <Popup imageUrl={'https://png.pngtree.com/png-clipart/20230812/original/pngtree-marks-of-error-incorrect-negated-rejected-disapproved-invalid-inaccurate-unacceptable-vector-picture-image_10444208.png'} 
      title={'ERROR'}
      message={'Vui lòng nhập đủ thông tin '}
      onPress={() => setShow(false)}
      /> : ''}
    </View>
  );
}

const st = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    position: "relative",
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  inforContainer: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headerDrawer: {},
  shadow: {
    flex: 1,
    paddingVertical: 20,
    width: "90%",

    position: "absolute",
    top: 50,
    shadowColor: "#8c8c8c",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    backgroundColor: "#ffffff",
    elevation: 10,
  },
  bgPosi: {
    backgroundColor: "#FE5045",
    height: 250,
    width: "100%",

    right: 0,
    borderBottomStartRadius: 75,
    borderBottomRightRadius: 75,
    top: 0,
  },
  containerStatus: {
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textStatus: {
    fontSize: 12,
  },
  btnStyle: {
    marginVertical: 25,
  },
});

