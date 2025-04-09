import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface BottomNavigationProps {
  currentScreen: string;
  onSelectScreen: (screen: string) => void;
}

export const BottomNavigation = ({
  currentScreen,
  onSelectScreen,
}: BottomNavigationProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab]}
        onPress={() => onSelectScreen("Dashboard")}
      >
        <Text
          style={[
            styles.tabText,
            currentScreen === "Dashboard" && styles.activeTabText,
          ]}
        >
          Dashboard
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab]}
        onPress={() => onSelectScreen("Details")}
      >
        <Text
          style={[
            styles.tabText,
            currentScreen === "Details" && styles.activeTabText,
          ]}
        >
          Details
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 40,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    width: "90%",
    borderRadius: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  activeTab: {
    borderTopWidth: 3,
    borderTopColor: "#007BFF",
  },
  tabText: {
    color: "#8e8e93",
    fontSize: 12,
  },
  activeTabText: {
    color: "#007BFF",
  },
});
