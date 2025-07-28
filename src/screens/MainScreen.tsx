import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import { BottomNavigation, Screen } from "#components";

import { DashboardScreen } from "./DashboardScreen";
import { DetailsScreen } from "./DetailsScreen";

type Screen = "Dashboard" | "Details";

export const MainScreen = ({ navigation }: { navigation: any }) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("Dashboard");

  const renderScreen = () => {
    switch (currentScreen) {
      case "Dashboard":
        return <DashboardScreen navigation={navigation} />;
      case "Details":
        return <DetailsScreen navigation={navigation} />;
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.screenContainer}>{renderScreen()}</View>
        <BottomNavigation
          currentScreen={currentScreen}
          onSelectScreen={(screen) => setCurrentScreen(screen as Screen)}
        />
      </View>
    </Screen>
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
