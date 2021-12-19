import React, {useState, useEffect} from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase";

import { useSelector } from "react-redux";
import { selectuserState } from "../slices/navSlice";


import Button from "../../components/Button";
import poorImage from "../../assets/123.png";
import logo from "../../assets/LogoKhanaSabkliye-01.png";

const PendingPage = ({ navigation }) => {
  
  const userState = useSelector(selectuserState);
 
    
  



  return (
    <View style={[tw``, { backgroundColor: "#0D1724", flex: 1 }]}>
      <View
        style={[
          tw`h-1.6/2 rounded-b-3xl p-10 items-center`,
          { backgroundColor: "white" },
        ]}
      >
        <Image
          style={{
            width: 150,
            height: 150,
            resizeMode: "contain",
          }}
          source={logo}
        />
        <Text style={tw`text-white text-lg`}>Get There</Text>
        <Image
          style={{ position: "absolute", top: 180, left: 50 }}
          source={poorImage}
        />
      </View>
      <View style={tw`absolute bottom-5 w-full justify-center`}>
        <View style={{marginVertical: 5}}>
          <Button textName="Public User" toNavigate={userState ? "dashboard" : "signin"}/>
        </View>
        <View>
          <Button textName="Staff User" toNavigate={userState ? "dashboard" : "signin"}/>
        </View>
        
      </View>
    </View>
  );
};

export default PendingPage;

const styles = StyleSheet.create({});
