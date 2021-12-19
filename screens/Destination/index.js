import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Map from "../../components/Map";
import { useDispatch } from "react-redux";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";


import { NavigationContainer, useNavigation } from "@react-navigation/native";


import { auth, db } from "../../config/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";

import { GOOGLE_MAPS_APIKEY } from "@env";

import { setDestination, setPickup, setuserState } from "../slices/navSlice";
import Button from "../../components/Button";

import * as Location from "expo-location";

import tw from "twrnc";
import { createStackNavigator } from "@react-navigation/stack";
import { withSafeAreaInsets } from "react-native-safe-area-context";

const Stack = createStackNavigator();

const foodbanks = [
  {
    "branch_name": "Aliabad",
    "latitude": 24.9200172,
    "longitude": 67.0612345
  },
  {
    "branch_name": "Numaish chowrangi",
    "latitude": 24.8732834,
    "longitude": 67.0337457
  },
  {
    "branch_name": "Saylani house phase 2",
    "latitude": 24.8278999,
    "longitude": 67.0688257
  },
  {
    "branch_name": "Touheed commercial",
    "latitude": 24.8073692,
    "longitude": 67.0357446
  },
  {
    "branch_name": "Sehar Commercial",
    "latitude": 24.8138924,
    "longitude": 67.0677652
  },
  {
    "branch_name": "Jinnah avenue",
    "latitude": 24.8949528,
    "longitude": 67.1767206
  },
  {
    "branch_name": "Johar chowrangi",
    "latitude": 24.9132328,
    "longitude": 67.1246195
  },
  {
    "branch_name": "Johar chowrangi 2",
    "latitude": 24.9100704,
    "longitude": 67.1208811
  },
  {
    "branch_name": "Hill park",
    "latitude": 24.8673515,
    "longitude": 67.0724497
  }
]

const Destination = () => {
  const dispatch = useDispatch();
  
  const navigation = useNavigation();

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const logoutHandler = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("user sign out successfully");
      dispatch(setuserState(false))
      navigation.navigate('signin')
    }).catch((error) => {
      // An error happened.
      console.log("not signed out")
      dispatch(setuserState(false))
      navigation.navigate('signin')
    });
  }

  useEffect(() => {
    dispatch(setDestination(foodbanks))
  }, []);

  return (
    <>
      <View style={[tw``, { backgroundColor: "#0D1724", flex: 1 }]}>
        <View style={[tw`h-1.5/2 rounded-b-3xl`]}>
          <Map />
        </View>
        <TouchableOpacity style={{
          position: "absolute",
          top: 60,
          backgroundColor: "#5ABC34",
          left: 25,
          borderRadius: 50,
          padding: 10,





        }}
          onPress={logoutHandler}>
          <Text style={{
            color: 'white',
            marginHorizontal: 20
          }}

          >
            Logout
          </Text>
        </TouchableOpacity>
        <View>
          <Text style={{
            textAlign: 'center',
            color: "white",
            fontSize: 20,
            paddingTop: 20

          }}>
            Zoom out to see all the food banks
          </Text>
        </View>
        <View style={tw`absolute bottom-5 w-full justify-center`}>
          <Button textName="Next" toNavigate="formUser" />
        </View>
      </View>
    </>
  );
};

export default Destination;

const styles = StyleSheet.create({});