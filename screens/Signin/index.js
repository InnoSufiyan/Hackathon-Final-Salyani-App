import React, { useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { db, auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";

import { setuserState } from "../slices/navSlice";

import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import tw from "twrnc";

import Button from "../../components/Button";

const Signin = () => {
  
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  console.log(email, password);
  
  function loginHandler() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("user signing in", user)
        dispatch(setuserState(true))
        navigation.navigate('dashboard')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        alert(`${errorMessage}, "create account plz"`)
      });
  }


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={[tw``, { backgroundColor: "#5ABC34", flex: 1 }]}>
        <View
          style={[
            tw`h-0.6/2 rounded-b-3xl pt-20 items-center`,
            { backgroundColor: "white" },
          ]}
        >
          <Text style={tw`text-black text-3xl`}>Sign In!</Text>
          <Text style={tw`text-black p-3 text-center`}>
            Food for you..!
          </Text>
        </View>
        <View style={tw`mx-10 mt-10`}>
          <TextInput
            style={[styles.input, tw`border-b text-lg mt-5`]}
            placeholderTextColor="white"
            placeholder="Enter Email"
            onChangeText={setemail}
          />
          <TextInput
            style={[styles.input, tw`border-b text-lg mt-5`]}
            placeholderTextColor="white"
            placeholder="Password"
            onChangeText={setpassword}
          />
          <TouchableOpacity
            style={tw`mt-5`}
            onPress={() => navigation.navigate("signup")}
          >
            <Text style={tw`text-white`}>Don't have an Account ??</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={loginHandler}>
          <Text style={tw`text-white text-center text-lg`}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Signin;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#0D0D0D",
    borderColor: "#4C4AC1",
    textAlign: "center",
    color: "white",
  },
});
