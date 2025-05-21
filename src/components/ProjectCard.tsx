import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";

import { TStyle } from "#types";
import { AppText } from "./AppText";
interface IProjectCard {
  name: string;
  description: string;
  website_url: string;
  appstore_url?: string;
  google_play_url?: string;
  imageUrl: string | null;
  style?: TStyle;
  handleReadMore: () => void;
}

export const ProjectCard = ({
  name,
  description,
  website_url,
  appstore_url,
  google_play_url,
  imageUrl,
  style,
  handleReadMore,
}: IProjectCard) => {
  return (
    <View style={[styles.card, style]}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 0.8 }}>
          <AppText isBold style={{ marginTop: 12 }} namedStyle="h2">
            {name}
          </AppText>
          <Text style={{ marginTop: 12 }}>{description}</Text>
        </View>
        {imageUrl && (
          <Image
            source={{ uri: imageUrl }}
            style={{ width: 100, height: 100, marginLeft: "auto" }}
            resizeMode="contain"
          />
        )}
      </View>

      <TouchableOpacity style={styles.readMoreButton} onPress={handleReadMore}>
        <Text style={styles.readMoreText}>Read More</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#04ADEF",
    padding: 16,
    flex: 1,
  },
  readMoreButton: {
    backgroundColor: "#04ADEF",
    borderRadius: 100,
    marginLeft: "auto",
    marginTop: 18,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  readMoreText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },

  container: {
    width: "90%",
    height: 260,
    alignSelf: "center",
    marginVertical: 20,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  description: {
    marginTop: 10,
    fontSize: 16,
  },
});
