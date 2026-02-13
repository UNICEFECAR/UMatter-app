import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Screen } from "#components";

import logoUnicef from "../../assets/logo-unicef.png";
import welcomeScreenImage from "../../assets/welcome-screen-image.png";

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

export const WelcomeScreen = ({ navigation }: WelcomeScreenProps) => {
  const { top } = useSafeAreaInsets();
  return (
    <Screen>
      <View style={[styles.mainContainer, { marginTop: top }]}>
        <View style={styles.container}>
          <View style={styles.topSection}>
            <Text style={styles.title}>Welcome to UNICEF Romania</Text>
            <Text style={styles.subtitle}>
              Your gateway to UNICEF's digital tools for support and
              empowerment.
            </Text>
          </View>

          <Image
            source={welcomeScreenImage}
            style={styles.image}
            resizeMode="contain"
          />

          <View style={styles.bottomSection}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Onboarding")}
            >
              <Text style={styles.buttonText}>Start your Journey</Text>
            </TouchableOpacity>
            <Image
              source={logoUnicef}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  topSection: {
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 20,
    letterSpacing: 0,
  },
  subtitle: {
    fontSize: 17,
    textAlign: "center",
    width: "95%",
    letterSpacing: 0,
  },
  image: {
    flex: 1,
    width: "100%",
    maxHeight: "45%",
    marginVertical: 20,
  },
  bottomSection: {
    alignItems: "center",
    width: "100%",
  },
  button: {
    backgroundColor: "#7B68EE",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: "100%",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0,
  },
  poweredBy: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
    letterSpacing: 0,
  },
  logo: {
    width: 105,
    height: 25,
    maxWidth: 200,
  },
});
