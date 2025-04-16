import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { IconAbout, IconArrowChevronForward, IconShare } from "./sprite";

interface IIcon {
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: string;
  style?: ViewStyle | ViewStyle[];
  customSize?: number;
  onPress?: () => void;
}

export const Icon = ({
  name,
  size = "sm",
  color,
  style,
  customSize,
  onPress,
}: IIcon) => {
  let icon;

  switch (name) {
    case "share":
      icon = <IconShare />;
      break;
    case "chevron-forward":
      icon = <IconArrowChevronForward color={color || "black"} />;
      break;
    case "about":
      icon = <IconAbout />;
      break;
  }

  const component = (
    <View
      style={[
        styles[size],
        style,
        customSize ? { width: customSize, height: customSize } : {},
      ]}
    >
      {icon}
    </View>
  );
  return onPress ? (
    <TouchableOpacity onPress={onPress}>{component}</TouchableOpacity>
  ) : (
    component
  );
};

const styles = StyleSheet.create({
  //Sizes:
  xs: { width: 12, height: 12 },
  sm: { width: 16, height: 16 },
  md: { width: 20, height: 20 },
  lg: { width: 28, height: 28 },
  xl: { width: 38, height: 38 },
});
