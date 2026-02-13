import { appStyles } from "#styles";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  DimensionValue,
} from "react-native";
import HomeIcon from "@expo/vector-icons/MaterialCommunityIcons";
import DetailsIcon from "@expo/vector-icons/Octicons";

interface BottomNavigationProps {
  currentScreen: string;
  onSelectScreen: (screen: string) => void;
}

const ICON_SIZE = 26;

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
            size={ICON_SIZE}
            color={
              currentScreen === "Dashboard" ? appStyles.colorPrimary : "#000"
            }
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
            size={ICON_SIZE}
            color={
              currentScreen === "Details" ? appStyles.colorPrimary : "#000"
            }
          />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 46,
    backgroundColor: "#fff",
    width: appStyles.maxWidth as DimensionValue,
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
    borderTopColor: appStyles.colorPrimary,
  },
  tabText: {
    color: "#8e8e93",
    fontSize: 12,
  },
});
