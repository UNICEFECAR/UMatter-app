import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Image,
} from "react-native";

import { AppHeading, AppText, ProjectCard } from "#components";
import { IProject, TNavigationFunc } from "#types";
import { useGetProjects } from "#hooks";

export const DashboardScreen = ({
  navigation,
}: {
  navigation: TNavigationFunc;
}) => {
  const { data, isLoading, isError, error } = useGetProjects();

  const handleMore = () => {
    navigation.push("About");
  };

  return (
    <View style={styles.safeArea}>
      <AppHeading handleMore={handleMore} screenName="Apps" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color="#04ADEF" />
        ) : isError ? (
          <AppText isError style={{ textAlign: "center" }}>
            {error.message}
          </AppText>
        ) : (
          <View>
            <Image
              source={require("../../assets/mascot.png")}
              style={{ width: 100, height: 100, alignSelf: "center" }}
              resizeMode="contain"
            />
            {data?.map((project: IProject, index: number) => (
              <ProjectCard
                key={index}
                name={project.name}
                description={project.description}
                website_url={project.website_url}
                appstore_url={project.appstore_url}
                google_play_url={project.google_play_url}
                imageUrl={project.imageUrl}
                style={{ marginTop: 12 }}
                handleReadMore={() => {
                  navigation.push("ProjectInformation", {
                    project,
                  });
                }}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
