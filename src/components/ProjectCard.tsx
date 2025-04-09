import {
  Text,
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
} from "react-native";

interface IProjectCard {
  name: string;
  description: string;
  website_url: string;
  appstore_url?: string;
  google_play_url?: string;
  style?: ViewStyle | ViewStyle[];
  handleReadMore: () => void;
}

export const ProjectCard = ({
  name,
  description,
  website_url,
  appstore_url,
  google_play_url,
  style,
  handleReadMore,
}: IProjectCard) => {
  return (
    <View style={[styles.card, style]}>
      <Text>{name}</Text>
      <Text style={{ marginTop: 12 }}>{description}</Text>
      <TouchableOpacity onPress={handleReadMore}>
        <Text style={styles.readMore}>Read More</Text>
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
  },
  readMore: {
    marginTop: 12,
    color: "#04ADEF",
  },
});
