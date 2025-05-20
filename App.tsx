// Other Essential Imports
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Context Imports
import { AuthProvider } from "./context/AuthContext";

// Navigater Import
import RootNavigator from "./navigation/RootNavigator";

// Import of toasts
import Toast from "react-native-toast-message";
import toastConfig from "./components/Config/toastConfig";

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
      <Toast
        config={toastConfig}
        position="top"
        visibilityTime={3000}
        autoHide
      />
    </SafeAreaProvider>
  );
}
