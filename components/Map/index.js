import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { selectDestination, selectPickup, selecttravelTimeInformation } from "../../screens/slices/navSlice";

import MapView, { Marker } from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import MarkerPic from "../../assets/marker.png";
import { GOOGLE_MAPS_APIKEY } from "@env";

import tw from "twrnc";

const Map = () => {
  const pickup = useSelector(selectPickup);
  const destination = useSelector(selectDestination);

  const travelTimeInformation = useSelector(selecttravelTimeInformation)

  const mapRef = useRef(null);
  console.log("pickupfromSelector--->", pickup);

  useEffect(() => {
    console.log("firstPickup-->", pickup);
    if (!pickup || !destination) return;

    console.log("secondPickup-->", pickup);
    if (mapRef.current) {
      console.log("map ref available---->", mapRef.current.fitToSuppliedMarkers)
    }
    mapRef?.current?.fitToSuppliedMarkers(['pickup', 'destination'], {
      animated: true,
      edgePadding: { top: 200, right: 200, bottom: 200, left: 200 },
    });
  }, [pickup, destination]);

  // useEffect(() => {
  //   console.log("ponka");
  //   if (!pickup || !destination) return;

  //   console.log("second useEffect");

  //   const getTravelTime = () => {
  //     console.log("third useEffect");
  //     fetch(
  //       `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${pickup.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
  //     )
  //       .then((res) => res.json())
  //       .then((data) => {
  //         dispatch(settravelTimeInformation(data.rows[0].elements[0]));
  //         console.log("data------>", data);
  //         console.log("ponka3------>");
  //       });
  //   };
  //   getTravelTime();
  // }, [pickup, destination, GOOGLE_MAPS_APIKEY]);

  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      initialRegion={{
        latitude: pickup?.location?.latitude,
        longitude: pickup?.location?.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {pickup && destination && (
        console.log("destination--->>>", destination)
      )}
      {pickup?.location && (
        <Marker
          key="123"
          coordinate={{
            latitude: pickup?.location?.latitude,
            longitude: pickup?.location?.longitude,
          }}
          title=""
          description=""
          identifier="pickup"
        />
      )}

      {destination?.map((item, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: item.latitude,
            longitude: item.longitude,
          }}
          title=""
          description=""
          identifier="destination"
        />
      ))}




      {/* {destination?.location && (
        <Marker
          key="456"
          coordinate={{
            latitude: destination?.location?.latitude,
            longitude: destination?.location?.longitude,
          }}
          title=""
          description=""
          identifier="destination"
        />
      )} */}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});