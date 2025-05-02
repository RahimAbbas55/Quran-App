import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import InputField from "./components/Reusable-Components/InputField";
import LoginScreen from "./screens/Auth-Screens/LoginScreen";
import SignUpScreen from "./screens/Auth-Screens/SignUpScreen";
import HomePage from "./screens/Main-Screens/Homepage";
import QuranReading from "./screens/Main-Screens/QuranReading";
export default function App() {
  return (
    <View style={styles.container}>
      {/* <LoginScreen/> */}
      {/* <SignUpScreen/> */}
      {/* <HomePage/> */}
      <QuranReading/>
      <StatusBar style="auto" />
    </View>
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
