import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DeviceInfo from "react-native-device-info";

import { Header } from "#components";
import { TNavigationFunc } from "#types";

export const AboutScreen = ({
  navigation,
}: {
  navigation: TNavigationFunc;
}) => {
  const appVersion = DeviceInfo.getVersion();
  return (
    <SafeAreaView>
      <View>
        <Header
          text="About UMatter+"
          handleGoBack={() => navigation.goBack()}
        />

        <Text style={{ marginTop: 24, fontSize: 28 }}>
          Support. Share. Make a Difference
        </Text>
        <Text style={{ textAlign: "center" }}>App Version {appVersion}</Text>
      </View>
    </SafeAreaView>
  );
};
