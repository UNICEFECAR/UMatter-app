import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";

interface IStoreButton {
  type: "appstore" | "googleplay" | "web";
  url: string;
}

export const StoreButton = ({ type, url }: IStoreButton) => {
  const handlePress = () => {
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.view}>
        <Text style={{ color: "#fff" }}>
          {type === "appstore"
            ? "App Store"
            : type === "googleplay"
            ? "Google Play"
            : "Website"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  view: {
    marginTop: 12,
    padding: 12,
    backgroundColor: "#04ADEF",
    borderRadius: 8,
    width: 200,
  },
});
