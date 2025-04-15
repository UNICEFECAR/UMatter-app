import { Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Header, StoreButton } from "#components";
import { RootStackParamList } from "#types";

type Props = NativeStackScreenProps<RootStackParamList, "ProjectInformation">;

export const ProjectInformationScreen: React.FC<Props> = ({
  route,
  navigation,
}) => {
  const params = route.params;
  const { project } = params;

  return (
    <SafeAreaView>
      <View>
        <Header
          text="Project Information"
          handleGoBack={() => navigation.goBack()}
        />
        <Text style={{ marginTop: 24 }}>{project.name}</Text>
        <Text style={{ marginTop: 24 }}>{project.description}</Text>

        <View style={{ marginTop: 20 }}>
          {project.appstore_url && (
            <StoreButton type="appstore" url={project.appstore_url} />
          )}
          {project.google_play_url && (
            <StoreButton type="googleplay" url={project.google_play_url} />
          )}
          {project.website_url && (
            <StoreButton type="web" url={project.website_url} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
