import * as React from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import InputField from "./components/Reusable-Components/InputField";
import LoginScreen from "./screens/Auth-Screens/Screens/LoginScreen";
import SignUpScreen from "./screens/Auth-Screens/Screens/SignUpScreen";
import HomePage from "./screens/Main-Screens/Homepage";
import QuranReading from "./screens/Main-Screens/QuranReading";
import Memorization from './screens/Main-Screens/Memorization';
import ForgotPassword from './screens/Auth-Screens/Screens/ForgetPassword';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './navigation/AuthNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <AuthNavigator/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
