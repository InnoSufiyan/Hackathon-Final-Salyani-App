import React, { useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { auth, db } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

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

const FormUser = () => {
  const navigation = useNavigation();

  const [fatherName, setfatherName] = useState("");
  const [CNIC, setCNIC] = useState("");
  const [dateOfNumber, setdateOfNumber] = useState("");
  const [numOfFamily, setnumOfFamily] = useState("");

  async function signupHandler() {
    console.log("clicked signup");

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(email);
          console.log(password);
          console.log("User Signed in")
          navigation.navigate('signin')
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);

          // ..
        });





    // console.log(name, fatherName, mobileNumber, email, password);
    // await createUser(name, fatherName, mobileNumber, email, password)
    
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={[tw``, { backgroundColor: "white", flex: 1 }]}>
        <View
          style={[
            tw`h-0.6/2 rounded-b-3xl pt-20 items-center`,
            { backgroundColor: "#5ABC34" },
          ]}
        >
          <Text style={tw`text-white text-3xl`}>Sign Up!</Text>
          <Text style={tw`text-white p-3 text-center`}>
            Please fill your details below to complete your account
          </Text>
        </View>
        <View style={tw`mx-10 mt-10`}>
          <TextInput
            onChangeText={setName}
            style={[styles.input, tw`border-b text-lg mt-5`]}
            placeholderTextColor="white"
            placeholder="Full Name"
          />
          <TextInput
            onChangeText={setmobileNumber}
            style={[styles.input, tw`border-b text-lg mt-5`]}
            placeholderTextColor="white"
            placeholder="Mobile Number"
          />
          <TextInput
            onChangeText={setemail}
            style={[styles.input, tw`border-b text-lg mt-5`]}
            placeholderTextColor="white"
            placeholder="Email"
          />
          <TextInput
            onChangeText={setpassword}
            style={[styles.input, tw`border-b text-lg mt-5`]}
            placeholderTextColor="white"
            placeholder="Password"
          />
          <TextInput
            onChangeText={setAdmin}
            style={[styles.input, tw`border-b text-lg mt-5`]}
            placeholderTextColor="white"
            placeholder="Are you admin or public ?"
          />
          <TouchableOpacity
            style={tw`mt-5`}
            onPress={() => navigation.navigate("signin")}
          >
            <Text style={tw`text-white`}>Already have an Account ??</Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            tw`fixed top-20 w-full justify-center rounded-2xl py-4`,
            { backgroundColor: "#5ABC34" },
          ]}
        >
          <TouchableOpacity onPress={signupHandler}>
            <Text style={tw`text-white text-center text-lg`}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default FormUser;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#0D0D0D",
    borderColor: "#4C4AC1",
    textAlign: "center",
    color: "white",
  },
});
