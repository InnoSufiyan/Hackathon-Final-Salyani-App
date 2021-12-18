import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Map from "../../components/Map";
import { useDispatch, useSelector } from "react-redux";
import { selecttravelTimeInformation } from "../slices/navSlice";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import car1 from '../../assets/1.png'
import car2 from '../../assets/2.png'
import car3 from '../../assets/3.png'
import car4 from '../../assets/4.png'

import { GOOGLE_MAPS_APIKEY } from "@env";

import { setDestination, setPickup } from "../slices/navSlice";
import Button from "../../components/Button";

import * as Location from "expo-location";

import tw from "twrnc";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const RideOption = () => {
  const dispatch = useDispatch();
  const travelTimeInformation = useSelector(selecttravelTimeInformation)

  const [selected, setSelected] = useState(null)

  const [location, setLocation] = useState(null);

  const [errorMsg, setErrorMsg] = useState(null);


  return (
    <>
      <View style={[tw``, { backgroundColor: "#0D1724", flex: 1 }]}>
        <View style={[tw`h-2/2 rounded-b-3xl`]}>
          <Map />
        </View>
        <View style={tw`absolute bottom-5 w-full justify-center`}>
          {selected && (
            <View style={[tw`h-70 mx-3 rounded-3xl flex justify-between items-center`, { opacity: 0.9, backgroundColor: "black", position: "relative", bottom: 10 }]}>
              <Text style={{ color: "white", fontSize: 20 }}>Your Uber Taxi</Text>
              <Image source={car4} />
              <View style={[tw`w-full flex-1 flex-row justify-around items-center`]}>
                <View>
                  <Text style={{color: "white"}}>Audi Q7</Text>
                  <Text style={{color: "white"}}>seat availability</Text>
                  <Text style={{color: "white"}}>Distance</Text>
                  <Text style={{color: "white"}}>Time</Text>
                </View>
                <View>
                  <Text style={{color: "white"}}>23$</Text>
                  <Text style={{color: "white"}}>4 Person</Text>
                  <Text style={{color: "white"}}>6.3 KM</Text>
                  <Text style={{color: "white"}}>25 mints</Text>
                </View>
              </View>
            </View>
          )}
          <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "flex-end", backgroundColor: "black", borderRadius: 20, height: 180, marginBottom: 20, opacity: 0.8 }}>
            <TouchableOpacity
              onPress={() => setSelected("1")}
            >
              <Image
                style={{ width: 100, position: "relative", bottom: selected == 1 ? -20 : -50, }}
                source={car1}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelected("2")}
            >
              <Image
                style={{ width: 100, position: "relative", bottom: selected == 2 ? -20 : -50, }}
                source={car2}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelected("3")}
            >
              <Image
                style={{ width: 100, position: "relative", bottom: selected == 3 ? -20 : -50, }}
                source={car3}
              />
            </TouchableOpacity>
          </View>

          <Button textName="Select Car" toNavigate="rideoption" />
        </View>
      </View>
    </>
  );
};

export default RideOption;

const styles = StyleSheet.create({});
