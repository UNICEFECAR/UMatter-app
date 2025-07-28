import { Text, View } from "react-native";
import * as Application from "expo-application";

import { Header, Screen } from "#components";
import { TNavigationFunc } from "#types";

export const AboutScreen = ({
  navigation,
}: {
  navigation: TNavigationFunc;
}) => {
  const appVersion = Application.nativeApplicationVersion;

  return (
    <Screen>
      <View style={{ flex: 1 }}>
        <Header
          text="About UMatter+"
          handleGoBack={() => navigation.goBack()}
        />
        <Text
          style={{
            fontSize: 28,
            marginTop: 24,
            textAlign: "center",
            marginHorizontal: 20,
          }}
        >
          Support. Share. Make a Difference
        </Text>
        <Text
          style={{ textAlign: "center", maxWidth: "95%", marginTop: "auto" }}
        >
          App Version {appVersion}
        </Text>
      </View>
    </Screen>
  );
};
