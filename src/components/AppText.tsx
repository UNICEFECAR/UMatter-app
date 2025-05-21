import { StyleSheet, Text, TextStyle } from "react-native";

interface IAppText {
  namedStyle?: "h1" | "h2";
  style?: TextStyle | TextStyle[];
  white?: boolean;
  isBold?: boolean;
  isError?: boolean;
  children: React.ReactNode;
  onPress?: () => void;
}

export const AppText = ({
  namedStyle,
  white,
  isBold,
  isError,
  style,
  children,
  onPress,
}: IAppText) => {
  return (
    <Text
      onPress={onPress}
      style={[
        styles.text,
        namedStyle && styles[namedStyle],
        isBold && styles.bold,
        isError && styles.isError,
        white && styles.white,
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    flexWrap: "wrap",
    flexShrink: 1,
    fontSize: 16,
    // lineHeight: 21,
  },
  h1: {
    fontSize: 32,
    color: "#000",
  },
  h2: {
    fontSize: 24,
    color: "#000",
  },
  bold: {
    fontWeight: "bold",
  },
  isError: {
    color: "#FF0000",
  },
  white: {
    color: "#FFFFFF",
  },
});
