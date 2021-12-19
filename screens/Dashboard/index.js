import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Map from "../../components/Map";
import { useDispatch } from "react-redux";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { auth, db } from "../../config/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";

import { GOOGLE_MAPS_APIKEY } from "@env";

import { setDestination, setPickup, setuserState } from "../slices/navSlice";
import Button from "../../components/Button";

import * as Location from "expo-location";

import tw from "twrnc";
import { createStackNavigator } from "@react-navigation/stack";
import Signin from "../Signin";

const Stack = createStackNavigator();

const Dashboard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       // User is signed in, see docs for a list of available properties
  //       // https://firebase.google.com/docs/reference/js/firebase.User
  //       const uid = user.uid;
  //       console.log("is Login", uid)
  //       navigation.navigate('splash')
  //       // ...
  //     } else {
  //       // User is signed out
  //       // ...
  //     }
  //   });
  // })

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log("userlocation-->", location);
      dispatch(
        setPickup({
          location: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
        })
      );
      dispatch(setDestination(null));
    })();
  }, []);

  const logoutHandler = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("user sign out successfully");
      dispatch(setuserState(false))
      navigation.navigate('signin')
    }).catch((error) => {
      // An error happened.
    });
  }

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
        <View style={tw`absolute bottom-5 w-full justify-center`}>
          <GooglePlacesAutocomplete
            placeholder="Choose Home Location"
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
            }}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
            }}
            onPress={(data, details = null) => {
              dispatch(
                setPickup({
                  location: {
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                  },
                  description: data.description,
                })
              );
              dispatch(setDestination(null));
            }}
            fetchDetails={true}
            returnKeyType={"search"}
            enablePoweredByContainer={false}
            minLength={2}
            listViewDisplayed={true}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
          />

          <Button textName="Next" toNavigate="destination" />
        </View>
      </View>
    </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});