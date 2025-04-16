import { ButtonSelector } from "#components";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const DetailsScreen = () => {
  return (
    <View>
      <Text>Details</Text>
      <ButtonSelector
        icon="share"
        text="Share application"
        onPress={() => {
          console.log("Back button pressed");
        }}
        style={{ marginTop: 25 }}
      />
      <ButtonSelector
        icon="about"
        text="About"
        onPress={() => {
          console.log("Back button pressed");
        }}
        style={{ marginTop: 19 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
