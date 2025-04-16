import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "./AppText";
import { Icon } from "./Icon";
import { TStyle } from "#types";

interface IButtonSelector {
  icon: string;
  text: string;
  onPress: () => void;
  style?: TStyle;
}

export const ButtonSelector = ({
  icon,
  text,
  onPress,
  style,
}: IButtonSelector) => {
  return (
    <TouchableOpacity style={[styles.butonSelector, style]} onPress={onPress}>
      <Icon size="md" name={icon} />
      <AppText style={{ paddingLeft: 12 }}>{text}</AppText>
      <Icon
        size="md"
        style={styles.icon}
        name="chevron-forward"
        color="#3D527B"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  butonSelector: {
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 30,
    shadowColor: Platform.OS === "ios" ? "#684dfd33" : "#684dfd",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 5,

    elevation: 5,
    backgroundColor: "#FFFFFF",
    padding: 12,
    width: "95%",
    alignSelf: "center",
  },
  icon: { marginLeft: "auto", marginRight: 8 },
});
