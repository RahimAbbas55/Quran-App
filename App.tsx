import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

//Navigaters Imports
import AuthNavigator from "./navigation/AuthNavigator";

//Import of toasts
import Toast from "react-native-toast-message";
import toastConfig from "./components/Config/toastConfig";

export default function App() {
  return (
    <SafeAreaProvider>
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
        <Toast
          config={toastConfig}
          position="top"
          visibilityTime={3000}
          autoHide
        />
    </SafeAreaProvider>
  );
}
