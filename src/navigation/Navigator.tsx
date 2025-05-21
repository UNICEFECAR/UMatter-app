import { useState } from "react";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  WelcomeScreen,
  OnboardingScreen,
  ProjectInformationScreen,
  MainScreen,
} from "#screens";
import { RootStackParamList } from "#types";

const Stack = createNativeStackNavigator<RootStackParamList>();

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
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isOnboarding ? "Welcome" : "Main"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen
          name="ProjectInformation"
          component={ProjectInformationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
