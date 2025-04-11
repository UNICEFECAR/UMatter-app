import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Navigator } from "#navigation";

const queryClient = new QueryClient();

export default function App() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <QueryClientProvider client={queryClient}>
        <StatusBar backgroundColor="#fff" />
        <Navigator />
      </QueryClientProvider>
    </SafeAreaView>
  );
}
