import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import logo from "../../assets/logo.png";
import { SafeAreaView } from "react-native-safe-area-context";

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

export const WelcomeScreen = ({ navigation }: WelcomeScreenProps) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <Image resizeMode="contain" source={logo} style={styles.logo} />
        <Text style={styles.title}>Welcome to UMatter+!</Text>
        <Text style={styles.subtitle}>
          Your gateway to UNICEF’s digital tools for support and empowerment.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Onboarding")}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 60,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: "auto",
    textAlign: "center",
    width: "80%",
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: "100%",
    shadowColor: "#684DFD",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    textAlign: "center",
    color: "#20809E",
    fontSize: 16,
    fontWeight: "600",
  },
  logo: {
    width: "100%",
    marginBottom: "auto",
  },
});
