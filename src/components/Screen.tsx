import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

export const Screen = ({ children }: { children: React.ReactNode }) => {
  return (
    <LinearGradient
      colors={["#E8D5FF", "#F5E6FF", "#FFF0E6", "#FFF8F0", "#FFFFFF"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
    </LinearGradient>
  );
};
