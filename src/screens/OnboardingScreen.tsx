import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  DimensionValue,
  Image,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";
import { appStyles } from "#styles";

import { Screen } from "#components";

import image1 from "../../assets/onboarding-image.png";
import image2 from "../../assets/onboarding-image-2.png";

import { AppText, Header } from "#components";

type OnboardingScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

const { width } = Dimensions.get("window");

const onboardingData = [
  {
    id: "1",
    title: "Why UNICEF Romania?",
    description: "Designed With Youth in Mind",
    footer:
      "UNICEF Romania helps you discover UNICEF initiatives like uSupport and U Report, all in one place.",
    image: image1,
  },
  {
    id: "2",
    title: "Explore & Connect",
    description: "Support. Share. Make a Difference.",
    footer:
      "Easily access platforms to share your voice and get the help you need.",
    image: image2,
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
          {item.image && (
            <View style={styles.imageContainer}>
              <Image
                source={item.image}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
          )}
          <AppText style={styles.description}>{item.footer}</AppText>
        </View>
      </View>
    );
  };
  const headerText = onboardingData[currentIndex]?.title || "Onboarding";

  return (
    <Screen>
      <View style={styles.container}>
        <Header text={headerText} handleGoBack={() => navigation.goBack()} />
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
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    justifyContent: "center",
    alignItems: "center",
  },
  slideItem: {
    backgroundColor: appStyles.colorPrimary,
    width: Dimensions.get("window").width * 0.9,
    borderRadius: 25,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "white",
    paddingTop: 20,
    paddingHorizontal: 26,
  },
  imageContainer: {
    width: "100%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    maxHeight: 230,
  },
  description: {
    marginTop: 12,
    fontSize: 20,
    textAlign: "center",
    color: "white",
    paddingHorizontal: 26,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: appStyles.maxWidth as DimensionValue,
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
    backgroundColor: appStyles.colorPrimary,
    width: 17,
  },
  button: {
    backgroundColor: appStyles.colorPrimary,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 20,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
  },
  skipButton: {
    alignSelf: "center",
  },
  skipButtonText: {
    color: "#666",
    fontSize: 18,
  },
});
