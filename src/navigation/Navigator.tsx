import { useState } from "react";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  WelcomeScreen,
  OnboardingScreen,
  ProjectInformationScreen,
  MainScreen,
} from "#screens";
import { RootStackParamList } from "#types";
import { AboutScreen } from "src/screens/AboutScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

export const Navigator = () => {
  const [isOnboarding, setIsOnboarding] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      const onboarding = await SecureStore.getItemAsync("onboarding");
      setIsOnboarding(onboarding === "true");
    };
    checkOnboarding();
  }, []);

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        initialRouteName={isOnboarding ? "Main" : "Welcome"}
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          animationDuration: 150, // Even faster
          // Prevent screen overlap completely
          freezeOnBlur: true,
          // Force proper stacking
          animationTypeForReplace: "push",
          contentStyle: {
            backgroundColor: "transparent",
            // Ensure proper isolation
            flex: 1,
          },
          // Add gestureEnabled for smoother feel
          gestureEnabled: true,
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen
          name="ProjectInformation"
          component={ProjectInformationScreen}
        />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
