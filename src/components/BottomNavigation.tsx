import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import HomeIcon from "react-native-vector-icons/MaterialCommunityIcons";
import DetailsIcon from "react-native-vector-icons/Octicons";

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
        <Text style={[styles.tabText]}>
          <HomeIcon
            name="home"
            size={24}
            color={currentScreen === "Dashboard" ? "#20809E" : "#000"}
          />
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab]}
        onPress={() => onSelectScreen("Details")}
      >
        <Text style={[styles.tabText]}>
          <DetailsIcon
            name="three-bars"
            size={24}
            color={currentScreen === "Details" ? "#20809E" : "#000"}
          />
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
    width: "90%",
    borderRadius: 20,
    marginLeft: "auto",
    marginRight: "auto",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
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
});
