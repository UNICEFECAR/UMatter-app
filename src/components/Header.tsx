import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

interface IHeader {
  text: string;
  goBack?: boolean;
  handleGoBack?: () => void;
}

export const Header = ({ text, goBack = true, handleGoBack }: IHeader) => {
  return (
    <View style={styles.header}>
      {goBack && (
        <TouchableOpacity onPress={handleGoBack}>
          <Text style={{ color: "#04ADEF" }}>Back</Text>
        </TouchableOpacity>
      )}
      <Text style={{ marginLeft: 12, fontSize: 18 }}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
  },
});
