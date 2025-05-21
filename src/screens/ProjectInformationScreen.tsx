import { View, Image, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppText, Header, StoreButton } from "#components";
import { RootStackParamList } from "#types";

type Props = NativeStackScreenProps<RootStackParamList, "ProjectInformation">;

export const ProjectInformationScreen: React.FC<Props> = ({
  route,
  navigation,
}) => {
  const params = route.params;
  const { project } = params;

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header text={project.name} handleGoBack={() => navigation.goBack()} />
        <Image
          source={{ uri: project.imageUrl }}
          style={styles.image}
          resizeMode="contain"
        />
        <AppText namedStyle="h2" isBold style={styles.title}>
          {project.name}
        </AppText>
        <AppText style={styles.description}>{project.description}</AppText>

        <View style={styles.storeButtons}>
          {project.google_play_url && (
            <StoreButton type="googleplay" url={project.google_play_url} />
          )}
          {project.appstore_url && (
            <StoreButton type="appstore" url={project.appstore_url} />
          )}
          {project.website_url && (
            <StoreButton type="web" url={project.website_url} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 90,
    alignSelf: "center",
    marginTop: 40,
  },
  title: {
    marginTop: 24,
    alignSelf: "center",
    textAlign: "center",
    marginHorizontal: 20,
  },
  description: {
    marginTop: 24,
    alignSelf: "center",
    textAlign: "center",
    marginHorizontal: 20,
  },
  storeButtons: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});
