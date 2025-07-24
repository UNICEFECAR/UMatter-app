import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import * as SplashScreen from "expo-splash-screen";

import { Navigator } from "./src/navigation/Navigator";

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [key, setKey] = useState(0);
  const [isReady, setIsReady] = useState(true);

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      } catch (e) {
        console.warn(e);
      } finally {
        // setIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (isReady) {
      const timer = setTimeout(() => setKey(1), 100);
      return () => clearTimeout(timer);
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <LinearGradient
      colors={["#E8D5FF", "#F5E6FF", "#FFF0E6", "#FFF8F0", "#FFFFFF"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView key={key} style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          <StatusBar translucent />
          <Navigator />
        </QueryClientProvider>
      </SafeAreaView>
    </LinearGradient>
  );
}
