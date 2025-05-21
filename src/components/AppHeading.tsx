import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";

import { AppText } from "./AppText";

export const AppHeading = ({ handleMore }: { handleMore: () => void }) => {
  return (
    <View style={{ overflow: "hidden", paddingBottom: 10 }}>
      <View style={styles.header}>
        <View>
          <Image
            source={require("../../assets/logo.png")}
            style={{ maxWidth: 200 }}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity onPress={handleMore} style={styles.headerButton}>
          <AppText white>More</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerButton: {
    backgroundColor: "#04ADEF",
    paddingHorizontal: 26,
    paddingVertical: 8,
    borderRadius: 20,
  },
});

//make this component available to the app
export default AppHeading;
