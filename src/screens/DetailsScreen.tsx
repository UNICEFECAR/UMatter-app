import { ButtonSelector, AppHeading } from "#components";
import { appStyles } from "#styles";
import React from "react";
import { View, Text, StyleSheet, DimensionValue } from "react-native";

export const DetailsScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View>
      <AppHeading screenName="Details" />
      {/* <ButtonSelector
        icon="share"
        text="Share application"
        onPress={() => {
          console.log("Back button pressed");
        }}
        style={{ marginTop: 25, width: appStyles.maxWidth as DimensionValue }}
      /> */}
      <ButtonSelector
        icon="about"
        text="About"
        onPress={() => {
          navigation.navigate("About");
        }}
        style={{ marginTop: 19, width: appStyles.maxWidth as DimensionValue }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
