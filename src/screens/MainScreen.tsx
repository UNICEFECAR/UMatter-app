import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BottomNavigation } from "#components";

type Screen = "Dashboard" | "Details";

export const MainScreen = ({ navigation }: { navigation: any }) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("Dashboard");

  const renderScreen = () => {
    switch (currentScreen) {
      case "Dashboard":
        return (
          <View>
            <Text>Dashboard</Text>
          </View>
        );
      case "Details":
        return (
          <View>
            <Text>Details</Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.screenContainer}>{renderScreen()}</View>
        <BottomNavigation
          currentScreen={currentScreen}
          onSelectScreen={(screen) => setCurrentScreen(screen as Screen)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
  },
});
