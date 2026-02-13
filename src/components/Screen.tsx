import { LinearGradient } from "expo-linear-gradient";
import { Platform } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export const Screen = ({ children }: { children: React.ReactNode }) => {
  const { top } = useSafeAreaInsets();
  return (
    <LinearGradient
      colors={["#E8D5FF", "#F5E6FF", "#FFF0E6", "#FFF8F0", "#FFFFFF"]}
      style={{
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
    </LinearGradient>
  );
};
