import React, { useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { auth, db } from "../../config/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";


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
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [numOfFamily, setnumOfFamily] = useState("");

  async function submissionHandler() {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log(uid)

        async function getData() {

          const docRef = doc(db, "Public", uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());

            await setDoc(doc(db, "Public", uid), {
              fatherName,
              CNIC,
              dateOfBirth,
              numOfFamily,
            }, { merge: true });
            navigation.navigate('pendingPage')
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        }

        getData()
        // ...
      } else {
        // User is signed out
        // ...
      }
    });

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
          <Text style={tw`text-white text-3xl`}>Details!</Text>
          <Text style={tw`text-white p-3 text-center`}>
            We want some further details from you for the process
          </Text>
        </View>
        <View style={tw`mx-10 mt-10`}>
          <TextInput
            onChangeText={setfatherName}
            style={[styles.input, tw`border-b text-lg mt-5`]}
            placeholderTextColor="white"
            placeholder="Fathers Name"
          />
          <TextInput
            onChangeText={setCNIC}
            style={[styles.input, tw`border-b text-lg mt-5`]}
            placeholderTextColor="white"
            placeholder="CNIC"
          />
          <TextInput
            onChangeText={setdateOfBirth}
            style={[styles.input, tw`border-b text-lg mt-5`]}
            placeholderTextColor="white"
            placeholder="Date of Birth"
          />
          <TextInput
            onChangeText={setnumOfFamily}
            style={[styles.input, tw`border-b text-lg mt-5`]}
            placeholderTextColor="white"
            placeholder="Family Members"
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
          <TouchableOpacity onPress={submissionHandler}>
            <Text style={tw`text-white text-center text-lg`}>Submission</Text>
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
