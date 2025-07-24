import React from "react";
import { View, StyleSheet, Image, DimensionValue } from "react-native";

import { AppText } from "./AppText";
import { appStyles } from "#styles";

export const AppHeading = ({ screenName }: { screenName: string }) => {
  return (
    <View style={styles.header}>
      <Image
        source={require("../../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.screenNameSection}>
        <View style={styles.screenNameContainer}>
          <AppText style={styles.screenNameText}>{screenName}</AppText>
        </View>
      </View>

      <View style={styles.decorativeContainer}>
        <View style={[styles.decorativeDot, styles.dot1]} />
        <View style={[styles.decorativeDot, styles.dot2]} />
        <View style={[styles.decorativeDot, styles.dot3]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: appStyles.maxWidth as DimensionValue,
    marginHorizontal: "auto",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 6,
    position: "relative",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  logo: {
    height: 60,
    width: 60,
  },
  logoGlow: {
    position: "absolute",
    top: -3,
    left: -3,
    right: -3,
    bottom: -3,
    borderRadius: 25.5,
    backgroundColor: appStyles.colorPrimary,
    opacity: 0.08,
    zIndex: -1,
  },
  screenNameSection: {
    flex: 1,
    justifyContent: "center",
  },
  screenNameContainer: {
    position: "relative",
  },
  screenNameText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1A1A1A",
    letterSpacing: 0.3,
    textTransform: "capitalize",
    marginRight: 4,
  },
  decorativeContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginLeft: 15,
  },
  decorativeDot: {
    borderRadius: 50,
    backgroundColor: appStyles.colorPrimary,
  },
  dot1: {
    width: 8,
    height: 8,
    opacity: 1,
    marginBottom: 4,
  },
  dot2: {
    width: 6,
    height: 6,
    opacity: 0.7,
    marginBottom: 4,
  },
  dot3: {
    width: 4,
    height: 4,
    opacity: 0.4,
  },
});

export default AppHeading;
