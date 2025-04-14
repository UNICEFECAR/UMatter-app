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

import { ProjectCard } from "#components";
import { IProject, TNavigationFunc } from "#types";
import { useGetProjects } from "#hooks";

export const DashboardScreen = ({
  navigation,
}: {
  navigation: TNavigationFunc;
}) => {
  const { data, isLoading } = useGetProjects();

  const handleMore = () => {
    navigation.push("About");
  };

  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="red" />
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>UMatter</Text>
          </View>
          <TouchableOpacity onPress={handleMore} style={styles.headerButton}>
            <Text style={styles.headerButtonText}>More</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {isLoading || !data ? (
            <ActivityIndicator size="large" color="#04ADEF" />
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
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333333",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666666",
    marginTop: 4,
  },
  headerButton: {
    backgroundColor: "#5E60CE",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  headerButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
    color: "#333333",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
  },
});
