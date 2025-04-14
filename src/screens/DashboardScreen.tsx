import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Image,
} from "react-native";

import { AppText, ProjectCard } from "#components";
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
      <StatusBar barStyle="dark-content" backgroundColor="red" />
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <AppText namedStyle="h2" isBold>
              UMatter
            </AppText>
          </View>
          <TouchableOpacity onPress={handleMore} style={styles.headerButton}>
            <AppText white>More</AppText>
          </TouchableOpacity>
        </View>

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
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  headerButton: {
    backgroundColor: "#5E60CE",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
