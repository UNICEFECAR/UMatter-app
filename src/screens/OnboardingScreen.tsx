import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";

import { AppText, Header } from "#components";

type OnboardingScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

const { width } = Dimensions.get("window");

const onboardingData = [
  {
    id: "1",
    title: "Why UMatter+?",
    description: "Designed With Youth in Mind",
    footer:
      "UMatter+ helps you discover UNICEF initiatives like uSupport and U Report, all in one place.",
  },
  {
    id: "2",
    title: "Explore & Connect",
    description: "Support. Share. Make a Difference.",
    footer:
      "Easily access platforms to share your voice and get the help you need.",
  },
];

export const OnboardingScreen = ({ navigation }: OnboardingScreenProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = React.useRef<FlatList>(null);

  const handleNext = async () => {
    if (currentIndex < onboardingData.length - 1) {
      // Programmatically scroll to the next item
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate("Main");
      await SecureStore.setItemAsync("onboarding", "true");
    }
  };

  const renderItem = ({ item }: { item: (typeof onboardingData)[0] }) => {
    return (
      <View style={[styles.slide, { width }]}>
        <View style={styles.slideItem}>
          <AppText style={styles.title}>{item.description}</AppText>
          <View
            style={{
              marginTop: 12,
              backgroundColor: "white",
              height: "70%",
              width: "80%",
              alignSelf: "center",
              padding: 18,
            }}
          ></View>
          <AppText style={styles.description}>{item.footer}</AppText>
        </View>
      </View>
    );
  };
  const headerText = onboardingData[currentIndex]?.title || "Onboarding";

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Header text={headerText} />
        <FlatList
          ref={flatListRef}
          data={onboardingData}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const index = Math.floor(event.nativeEvent.contentOffset.x / width);
            setCurrentIndex(index);
          }}
        />
        <View style={styles.paginationContainer}>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={async () => {
              await SecureStore.setItemAsync("onboarding", "true");
              navigation.navigate("Main");
            }}
          >
            <AppText isBold style={styles.skipButtonText}>
              Skip
            </AppText>
          </TouchableOpacity>
          <View style={styles.pagination}>
            {onboardingData.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === currentIndex && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>

          <AppText isBold style={styles.buttonText} onPress={handleNext}>
            {"Next"}
          </AppText>
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
  slide: {
    justifyContent: "center",
    alignItems: "center",
  },
  slideItem: {
    backgroundColor: "#2A82CD",
    width: Dimensions.get("window").width * 0.9,
    borderRadius: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "white",
    paddingTop: 20,
  },
  description: {
    marginTop: 12,
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
    color: "white",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
  },

  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: "#007BFF",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 20,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  skipButton: {
    alignSelf: "center",
  },
  skipButtonText: {
    color: "#666",
    fontSize: 14,
  },
});
