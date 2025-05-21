import {
  StyleSheet,
  TouchableOpacity,
  View,
  Linking,
  Image,
  Dimensions,
} from "react-native";

import appStore from "../../assets/appstore.png";
import googlePlay from "../../assets/google-play.png";
import share from "../../assets/share.png";
import { AppText } from "./AppText";

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
        <Image
          source={
            type === "appstore"
              ? appStore
              : type === "googleplay"
              ? googlePlay
              : share
          }
        />
        <AppText style={{ marginLeft: 12 }}>
          <AppText style={{ color: "#66768D", fontSize: 12 }}>
            Download from
          </AppText>
          <AppText style={{ color: "#20809E", fontSize: 16, lineHeight: 22 }}>
            {"\n"}
            {type === "appstore"
              ? "App Store"
              : type === "googleplay"
              ? "Google Play"
              : "Website"}
          </AppText>
        </AppText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: "white",
    borderRadius: 100,
    width: Dimensions.get("window").width * 0.45,
    shadowColor: "#684DFD",
    shadowOffset: { width: 0, height: 0.8 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 5,
  },
});
