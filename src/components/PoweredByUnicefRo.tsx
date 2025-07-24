import { Text, Image, StyleSheet } from "react-native";

import logoUnicef from "../../assets/logo-unicef.png";

export const PoweredByUnicefRo = () => {
  return (
    <>
      <Text style={styles.poweredBy}>Powered by UNICEF Romania</Text>
      <Image source={logoUnicef} style={styles.logo} resizeMode="contain" />
    </>
  );
};

const styles = StyleSheet.create({
  poweredBy: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    marginBottom: 10,
    letterSpacing: 0,
  },
  logo: {
    width: "60%",
    height: 40,
    maxWidth: 200,
  },
});
