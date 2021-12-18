import { NavigationContainer, useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

const Button = ({ toNavigate, textName }) => {
  const navigation = useNavigation();
  return (
    <View style={[tw`rounded-2xl mx-10 py-4`, { backgroundColor: "#5ABC34" }]}>
      {toNavigate && (
        <TouchableOpacity onPress={() => navigation.navigate(toNavigate)}>
          <Text style={tw`text-white text-center text-lg`}>{textName}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({});
